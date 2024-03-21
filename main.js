let carbon = new Decimal(10);
let highestcarbonthisreset = new Decimal(10);
let productionreduction = new Decimal(1);
let totalcarbonthisreset = new Decimal(0);
let timer = 0;
let time = 0;
let TimeSinceQuarkReset = 0;
// Carbon Generators
let cg = new Decimal(0);
let cgcost = new Decimal(10);
let cgboughttimes = new Decimal(0);
let cgmult = new Decimal(1);

// Production Speed
let pd = new Decimal(1);
let pdcost = new Decimal(100);
let pdboughttimes = new Decimal(0);
let pdcostpower = new Decimal(1);

// Boost Stuff
let boost = new Decimal("1");
let boostgainedonreset = new Decimal(0);

// Proton Stuff
let protons = new Decimal("0");
let protongainedonreset = new Decimal(1);
let protonupgrades = [
[0,"3"],
[0,"3"],
[0,"3"],
[0,"243"],
[0,"243"],
[0,"243"],
[0,"1e5"],
[0,"1e5"],
[0,"1e5"],
]
let plimit = new Decimal("1e25");
let prspeed = new Decimal("1");

// Quark Stuff
let qresettimes = new Decimal("0")
let canqreset = 0;
let togqreset = false;
let ExoticMatter = new Decimal("0");
let HCQR = new Decimal(0);
let HPDQR = new Decimal(0);
let Qupgrades = [
  [0,"8"],
  [0,"8"],
  [0,"8"],
  [0,"64"],
  [0,"64"],
  [0,"64"],
]
let ActiveEffects = [
  0,0,0
]

let progression = 0;

// Anti Stuff
let CarbonDestroyers = new Decimal(0);
let ProductionDelay = new Decimal(0);
let Diminish = new Decimal(0);
let AntiProtons = new Decimal(0);

// Honestly to lazy to put all of those variables into a player object sooo

let player = {
  nanoBots: new Decimal(1),
  chosenMultiplier: 0,
  quarkInventory: [
  ],
  activeQuarks: [],
  autobuyers: {}
}

// for easy reseting save.

let unsavedPlayer = player


function formatnum(Num, places=2) {
  if (!isDecimal(Num)) Num = new Decimal(Num)
  e = Num.log(10).floor()
  m = Num.div(new Decimal(10).pow(e.plus("1e-7"))).toFixed(2)
  // It breaks if the number is 0 idk why
  if (Num.eq("0")) {
    return `0`
  }
  if (Num.gte("1ee9")) {
    return `ee${Num.iteratedlog(10, 2).toFixed(2)}`
  }
  if (Num.gte("1e1000")) {
      return `e${Num.log(10).toFixed(2)}`
  }
  if (Num.gte(1000)) {
      if (m == 10) {
          m = "1.00";
          e = e.plus(1);
      }
      return `${m}e${e}`
  }

  if (Num.lte(Decimal.div(1,Decimal.pow10(places)))) {
    if (m == 10) {
        m = "1.00";
        e = e.plus(1);
    }
    return `${m}e${e}`
}
  if (Num.lte("1e-1000")) {
    return `e${Num.log(10).toFixed(2)}`
  }
  if (Num.lte("1ee-9")) {
  return `ee${Num.iteratedlog(10, 2).toFixed(2)}`
  }
  return Num.toStringWithDecimalPlaces(places);
}

function formatTime(timeInMilliseconds) {
  if (!isDecimal(timeInMilliseconds)) timeInMilliseconds = new Decimal(timeInMilliseconds);
  let timeInSeconds = timeInMilliseconds.div(1000);
  let timeInMinutes = timeInSeconds.div(60);
  let timeInHours = timeInMinutes.div(60);
  let timeInDays = timeInHours.div(24);

  if (timeInMilliseconds.lt(1000)) {
      return `${timeInMilliseconds.toFixed(2)} ms`;
  } else if (timeInSeconds.lt(60)) {
      return `${timeInSeconds.toFixed(2)} Seconds`;
  } else if (timeInMinutes.lt(60)) {
      return `${timeInMinutes.toFixed(2)} Minutes`;
  } else if (timeInHours.lt(24)) {
      return `${timeInHours.toFixed(2)} Hours`;
  } else if (timeInDays.lt(365)) {
      return `${timeInDays.toFixed(2)} Days`;
  } else {
      return `< 1 year`;
  }
}


// Get DOM elements
const pointsDisplay = [document.getElementById("ca"), document.getElementById("ca2")];
const cgs = document.getElementById("cgs");
const boostd = document.getElementById("boost");
const protonsd = document.getElementById("protons");
const pdrd = document.getElementById("pdr");
const dqr = document.getElementById("dqr");
const pl = document.getElementById("pl");
const qleveld = document.getElementById("qlevel");
const tcgsd = document.getElementById("tcgs");
const tpssd = document.getElementById("tpss");
const emd = document.getElementById("emd");
const emdr = document.getElementById("emdr");
const cgbuy = document.getElementsByClassName("cgbuy")[0]
const pdbuy = document.getElementsByClassName("pdbuy")[0]

function tick(diff) {
  plimit = new Decimal("1e2500");

  if (protons.gte("1e70")) canqreset = 1

  productionreduction = Decimal.max(getNextPR(diff, productionreduction), 1);

  Currencies.carbon.tick(diff);
  totalcarbonthisreset = totalcarbonthisreset.plus(Currencies.carbon.perSecond)
  Currencies.nanoBot.tick(diff);
  protonData.getIsUpgradeBought(14) ? Currencies.boost.tick(diff) : undefined
  updateHTML()


  if (boostGained(highestcarbonthisreset).gte(1)){
    progression = Math.max(1,progression)
  }
  if (boost.gte("1e5")){
    progression = Math.max(2,progression)
  }
  if (boost.gte("1e235") && protons.gte("1e60") && false){
    // gonna add Quarks later
    progression = Math.max(3,progression)
  }
  if (protons.gt(plimit)) {
    protons = plimit.minus(1);
    }

  pointsDisplay[0].textContent = formatnum(Currencies.carbon.value);
  pointsDisplay[1].textContent = formatnum(Currencies.carbon.value);
  pdrd.textContent = formatnum(effects.getEffectValueForClass("carbonGen"));
  cgs.textContent = formatnum(CGupgrade.set);
  boostd.textContent = formatnum(Currencies.boost.value) + " + " + formatnum(boostGained());
	protonsd.textContent = formatnum(protons) + " + " + formatnum(protonsGained(Currencies.carbon.value), 0);
  dqr.textContent = togqreset ? "yes" : "no";
  pl.textContent = formatnum(plimit);
  qleveld.textContent = formatnum(Decimal.max(getqlevel(true),1));
  emd.textContent = formatnum(ExoticMatter);
  emdr.textContent = formatnum(GetEmGained(carbon));
  document.getElementById("cps").textContent = formatnum(effects.pd.effectValue)
  document.getElementById("boostMult").textContent = formatnum(effects.boost.effectValue)
  document.getElementById("boostmMult").textContent = formatnum(effects.boostUpg.effectValue)
  document.getElementById("myBar").style.width = progressBarProgress() * 100 + `%`;
  document.getElementById("nanobot").textContent = formatnum(Currencies.nanoBot.value)
  document.getElementById("nanobotmul").textContent = formatnum(effects.nanoMult.effectValue)
  document.getElementById("timepr").textContent = productionreduction.eq(1) ?`Your production is normal` : `Your production will be normal in `+formatTime(getTimeToFinishPR(productionreduction))
  generateEffectClassHTML(effectClass.getEffectClassByID(player.chosenMultiplier))

    if (progression >= 1) {
      document.getElementById("boostTab").style.display = "initial";
    }
    else {document.getElementById("boostTab").style.display = "none";}
    if (progression >= 2) {
      document.getElementById("protonTab").style.display = "initial";
      document.getElementById("AutobuyerTab").style.display = "initial";
    }
    else {
      document.getElementById("protonTab").style.display = "none" 
      document.getElementById("AutobuyerTab").style.display = "none";
  }
    if (progression >= 3) {
      document.getElementById("quarkTab").style.display = "initial";
    }
    else {document.getElementById("quarkTab").style.display = "none";}
  
    Autobuyer.getInstanceBySet("cg").tick()
    RemakeAutobuyerButton(Autobuyer.getInstanceBySet("cg"))
    Autobuyer.getInstanceBySet("pd").tick()
    RemakeAutobuyerButton(Autobuyer.getInstanceBySet("pd"))
    Autobuyer.getInstanceBySet("bu").tick()
    RemakeAutobuyerButton(Autobuyer.getInstanceBySet("bu"))
}

function updateHTML(active) {
  if (!active) {
    SetRebuyable.instances.forEach(rebuyable => {
          RemakeRebuyableButton(rebuyable);
    });
  return
  }
    SetRebuyable.instances.forEach(rebuyable => {
        if (active(rebuyable.config.set)) {
            RemakeRebuyableButton(rebuyable);
        }
    });
}

function progressBarProgress() {
  switch (progression) {
  case 0: return Math.min(boostGained(highestcarbonthisreset).min(1).toNumber(), 1)
  case 1: return Currencies.boost.value.log(10).div("5").min(1).toNumber()
  case 2: return Math.min(protonData.allUpgrades().filter(upg => upg.set.gte(1)).length / 15, 1)
  }
}

function reset1() {
  if (boostGained(totalcarbonthisreset).gte(0.1)) {
    boost = boost.plus(boostGained());
    carbon = new Decimal(10);
    cg = new Decimal(0);
    cgboughttimes = new Decimal(0);
    cgcost = new Decimal(10);
    highestcarbonthisreset = new Decimal(10);
    pd = new Decimal(1);
    pdcost = new Decimal(100);
    pdboughttimes = new Decimal(0);
    cgmult = new Decimal(0);;
    totalcarbonthisreset = new Decimal(0);
    buyableSets.cg = new Decimal(0);
    buyableSets.pd = new Decimal(0);
    updateHTML()
  }


}

function buyqu(upgid) {
  let upgcost = Qupgrades[upgid][1];
  if (ExoticMatter.gte(new Decimal(upgcost)) ) {
  ExoticMatter = ExoticMatter.minus(upgcost)
  Qupgrades[upgid][0]++;
  }
  }

function autobuy() {

}

function buymax(buy) {
  if (buy == 0 && CGupgrade.canBuy) {
      CGupgrade.purchase(true);
      updateHTML();
    }

  if (buy == 1 && PDupgrade.canBuy) {
      PDupgrade.purchase(true);
      updateHTML();

  }

}

function switchMultiplierTab(id) {
  player.chosenMultiplier = id
}

async function SimulateTime(ms) {
  let Iterations = Math.min(Math.max(Math.floor(ms/100),1),1000)
  let NewMs = ms/Iterations
  await new Promise(resolve => setTimeout(resolve, 1000));
  for (I=0; I<Iterations; I++) {
      tick(NewMs)
  }
}

let hiddenTime;

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    hiddenTime = Date.now();
  } else {
    let visibleTime = Date.now();
    let timeDifference = visibleTime - hiddenTime;
    SimulateTime(timeDifference / 10);
  }
});

window.addEventListener('unload', function() {
  localStorage.setItem('closeTime', Date.now().toString());
});


function resetsave() {
  const buttons = [
    {
      text: "RESET NOW",
      clickHandler: () => {
        resetsaves();
        modalLibrary.showModal("<p>Save reset.</p>", []);
      }
    },
  ];
  
  modalLibrary.showModal("<p>Are you sure?</p>", buttons);
  
}

function toggleab(abid) {
  autobuyers[abid] = !autobuyers[abid]
}

document.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'm':
      buymax(0, 512);
      buymax(1, 512);
      break;
    case 'c':
      buymax(0, 512);
      break;
    case 'p':
      buymax(1, 512);
      break;
    default:
      break;
  }
});


updateHTML()

document.addEventListener('DOMContentLoaded', () => {
  if (!dev.disableStartInterval) setInterval(function() {tick(1)}, 10)
  loadlssave();
  let closeTime = localStorage.getItem('closeTime');
  if (closeTime) {
    let openTime = Date.now();
    let timeDifference = openTime - Number(closeTime);
    SimulateTime(timeDifference);
    localStorage.removeItem('closeTime');
  }
    const divs = document.querySelectorAll('div[id^="buyable_"]');
    divs.forEach(div => {
        const rebuyableName = div.id.replace("buyable_", "");
        const rebuyable = SetRebuyable.getInstanceBySet(rebuyableName);
        if (rebuyable) {
            const button = RemakeRebuyableButton(rebuyable);
            div.appendChild(button);
        }
    });
});
