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
let autobuyers = [1, 1]

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
  nanoBots: new Decimal(0),
  chosenMultiplier: 0,
}


function formatnum(Num, places=2) {
  if (!isDecimal(Num)) Num = new Decimal(Num)
  e = Num.log(10).floor()
  m = Num.div(new Decimal(10).pow(e.plus("1e-7"))).toFixed(2)
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
      return `<1 year`;
  }
}


// Get DOM elements
const pointsDisplay = document.getElementById("ca");
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
  autobuyertimerdiv = 1;
  autobuyerbulk = 0;
  timer++
  TimeSinceQuarkReset++
  quarksen = MyObject.getEnabledCount;
  plimit = new Decimal("1e100");
  plimitmul = new Decimal(1);
  prspeed = new Decimal("1");

if (protons.gte("9.99e9") && boost.gte("1e15")) {
canqreset = 1;
}
else {canqreset = 0;}
let freecgmult = new Decimal(1);
let bstrength = new Decimal(1);
pdcostpower = new Decimal(1);
cgcostmul = new Decimal(1);
cg = new Decimal(cgboughttimes);
let cgmult = new Decimal(1);
let pdPriceMult = new Decimal(1);




pd = new Decimal(1.5).pow(pdboughttimes);

  let freecgs = new Decimal(0);

  if (Qupgrades[0][0] == 1) {
    carbon = Decimal.max(carbon, "1e5");
    }
    if (Qupgrades[1][0] == 1) {
      boost = Decimal.max(boost, 10);
      }
      if (Qupgrades[1][0] == 1) {
        boost = Decimal.max(boost, "1e5");
        }
        if (Qupgrades[2][0] == 1) {
          protons = Decimal.max(protons, 3);
          }
          if (Qupgrades[3][0] == 1) {
            cgmult = cgmult.mul(ExoticMatter);
            pd = pd.mul(ExoticMatter);
            bstrength = bstrength.mul(ExoticMatter);
            }
            if (Qupgrades[4][0] == 1) {
                for (i = 0; i < protonupgrades.length; i++) {
                  if (i !== 5) {
                    protonupgrades[i][0] = 1;
                  }
                }
              }
  for (const instance of MyObject.instances) {
    t = instance.type
    e = instance.effects
    l = instance.level
    en = instance.enabled ? 0 : 1
    
    if (en == 0) {
      e.forEach(element => {
        if (t == 0) {
          if (element == 0) {
            es = geteffecttoname(t,[element],l,1)
            freecgs = freecgs.plus(es);
          }
          if (element == 1) {
            es = geteffecttoname(t,[element],l,1)
            cg = cg.times(es.plus(1))
          }
          if (element == 2) {
            es = geteffecttoname(t,[element],l,1)
            cgmult = cgmult.times(es)
          }
          if (element == 3) {
            es = geteffecttoname(t,[element],l,1)
            ActiveEffects[0] = new Decimal(ActiveEffects[0]).plus(es)
          }
        }
        if (t == 1) {
          if (element == 0) {
            es = geteffecttoname(t,[element],l,1)
            pd = pd.mul(es)
          }
          if (element == 1) {
            es = geteffecttoname(t,[element],l,1)
            pdlog = Decimal(pd.plus(1))
            plimit = plimit.mul(es.plus(1).mul(Decimal.max(pdlog.pow(0.2),1)))
          }
          if (element == 2) {
            es = geteffecttoname(t,[element],l,1)
            pdcostpower = pdcostpower.mul(es);
          }
          if (element == 3) {
            es = geteffecttoname(t,[element],l,1)
            ProductionDelay = ProductionDelay.plus(es.div(1000))
          }
        }

        if (t == 2) {
          if (element == 1) {
            es = geteffecttoname(t,[element],l,1)
            bstrength = bstrength.mul(es)
          }
          if (element == 2) {
            es = geteffecttoname(t,[element],l,1)
            if (TimeSinceQuarkReset >= 10) {
              newboost = boostgainedonreset.mul(es)
              if (newboost.isNaN == true) {
                newboost = new Decimal(1);
              }
              boost = boost.plus(newboost.div(100))
            }
          }
        }

        if (t == 3) {
          if (element == 0) {
            es = geteffecttoname(t,[element],l,1);
            protongainedonreset = protongainedonreset.mul(es);
          }
          if (element == 1) {
            es = geteffecttoname(t,[element],l,1);
            prspeed = prspeed.mul(es);
          }
          if (element == 2) {
            es = geteffecttoname(t,[element],l,1);
            plimit = plimit.times(es);
          }
        }
    
    
      });
    }
}
  productionreduction = Decimal.max(getNextPR(diff, productionreduction), 1);

	freecgs = freecgs.mul(freecgmult);

  newc = cg.plus(freecgs).times(cgmult).times(pd).times(boost.times(bstrength));
  newcrd = newc.div(new Decimal(100).mul(productionreduction));

  Currencies.carbon.tick(diff);
  Currencies.nanoBot.tick(diff)
  totalcarbonthisreset = totalcarbonthisreset.plus(newcrd);
  power = new Decimal(10).plus(Decimal.max(pdboughttimes.mul(5).minus(1540),0))
  pdcost = new Decimal(100).times(power.pow(pdboughttimes));
  pdcost = pdcost.mul(pdPriceMult);
  pdcost = pdcost.pow(pdcostpower);
  HCQR = HCQR.plus(newcrd);
  HPDQR = Decimal.max(pd,HPDQR);
  updateHTML()

if (carbon.isNaN == true) {
  fixNaN()
}

  


  if (timer%50 >= 49/autobuyertimerdiv) {
    autobuy(autobuyerbulk)
  }

  if (boostGained(highestcarbonthisreset).gte(1)){
    progression = Math.max(1,progression)
  }
  if (boost.gte("1e5")){
    progression = Math.max(2,progression)
  }
  if (boost.gte("1e15") && protons.gte("1e10")){
    progression = Math.max(3,progression)
  }
  if (protons.gt(plimit)) {
    protons = plimit.minus(1);
    }

  pointsDisplay.textContent = formatnum(Currencies.carbon.value);
  pdrd.textContent = formatnum(effects.getEffectValueForClass("carbonGen"));
  cgs.textContent = formatnum(CGupgrade.set);
  boostd.textContent = formatnum(Currencies.boost.value) + " + " + formatnum(boostGained(highestcarbonthisreset));
	protonsd.textContent = formatnum(protons) + " + " + formatnum(protonsGained(Currencies.carbon.value));
  dqr.textContent = togqreset ? "yes" : "no";
  pl.textContent = formatnum(plimit);
  qleveld.textContent = formatnum(Decimal.max(getqlevel(true),1));
  tcgsd.textContent = autobuyers[0] ? "enabled" : "disabled";
  tpssd.textContent = autobuyers[1] ? "enabled" : "disabled";
  emd.textContent = formatnum(ExoticMatter);
  emdr.textContent = formatnum(GetEmOnReset());
  document.getElementById("cps").textContent = formatnum(effects.pd.effectValue)
  document.getElementById("boostMult").textContent = formatnum(effects.boost.effectValue)
  document.getElementById("boostmMult").textContent = formatnum(effects.boostUpg.effectValue)
  document.getElementById("myBar").style.width = progressBarProgress() * 100 + `%`;
  document.getElementById("nanobot").textContent = formatnum(Currencies.nanoBot.value)
  document.getElementById("nanobotmul").textContent = formatnum(effects.nanoMult.effectValue)
  document.getElementById("timepr").textContent = productionreduction.eq(1) ?`Your production is normal` : `Your production will be normal in `+formatTime(getTimeToFinishPR(productionreduction))
  


for (let i = 0; i < 6; i++) {
  document.getElementById(`QUpg${i}`).disabled = Qupgrades[i][0];
}

    if (progression >= 1) {
      document.getElementById("boostTab").style.display = "initial";
    }
    else {document.getElementById("boostTab").style.display = "none";}
    if (progression >= 2) {
      document.getElementById("protonTab").style.display = "initial";
    }
    else {document.getElementById("protonTab").style.display = "none";}
    if (progression >= 3) {
      document.getElementById("quarkTab").style.display = "initial";
    }
    else {document.getElementById("quarkTab").style.display = "none";}
  

}

 



function getnextproductionreduction(pspeed) {
  Dfactor = new Decimal(1.000001).mul(pspeed);
  num = Decimal.max(productionreduction.div(Dfactor).minus(new Decimal(0.0001)),1);
  if (num.isNaN) {
    num = new Decimal(1);
  }
  return num;
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
  }
}

function getcgcost(steps) {
  t = cgboughttimes.plus(steps);
  cgcostmul = new Decimal(1);
  cgcostincrement = new Decimal(1.5);
  cgcostb = new Decimal(cgcostincrement).pow(t);
  cgcostb = cgcostb.times(cgcostmul);
  return cgcostb;
}

function GetEmOnReset() {
  const logC = Decimal.log(HCQR);
  const logPS = Decimal.log(HPDQR)
  return Decimal.round(logC.div(2.6).times(logPS.div(2.6).div(5)))
}

function togquarks() {
  togqreset = !togqreset;
}

function reset1() {
  if (boostGained(highestcarbonthisreset).gte(0.1)) {
    boost = boost.plus(boostGained(highestcarbonthisreset));
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

function reset2() {
  qlevel = getqlevel(true, false, [0,1]);
  if (canqreset == 1){
    ExoticMatter = ExoticMatter.plus(GetEmOnReset())
    TimeSinceQuarkReset = 0
    CarbonDestroyers = CarbonDestroyers.plus(ActiveEffects[0])
    boostgainedonreset = new Decimal(0.1)
    reset1()
    boostgainedonreset = new Decimal(0);
    boost = new Decimal(1);
    protons = new Decimal(0);
    productionreduction = new Decimal(1);
    HCQR = new Decimal(0);
    HPDQR = new Decimal(0);
  
    protonupgrades.forEach(upg => {
  
      upg[0] = 0;
  
    })
  
    if (togqreset == true) {
      disableall()
    }
  
  
    generaterandomQuark(qlevel)
    
  }
}

function getqlevel(floor, fake, fakeeffects) {
  protonL = Decimal.log(protons.plus(1)).pow(0.95).mul(0.45)
  boostL = Decimal.log(boost.plus(1)).pow(1.5).mul(0.45)
  if (fake == true) {
    protonL = Decimal.log(fakeeffects[0]).pow(0.4).mul(0.4)
    boostL = Decimal.log(fakeeffects[1]).pow(0.7).mul(0.16)
  }
  finalnum = boostL.mul(protonL)
  if (floor == false) {
    return Decimal.max(finalnum.minus(127),1)
  }
  if (floor == true) {
    return Decimal.max(Decimal.floor(finalnum).minus(127),1)
  }
}

function buypu(upgid, price) {
if (protons.gte(new Decimal(price)) && PU[upgid].mbuytimes !== protonupgrades[upgid][0] ) {
protons = protons.minus(price)
protonupgrades[upgid][0]++;
return true;
}
return false;
}

function buyqu(upgid) {
  let upgcost = Qupgrades[upgid][1];
  if (ExoticMatter.gte(new Decimal(upgcost)) ) {
  ExoticMatter = ExoticMatter.minus(upgcost)
  Qupgrades[upgid][0]++;
  }
  }

function autobuy(MaxBuyTimes) {
// TBD
}

function buymax(buy, mbt) {
  if (mbt == null) {
    mbt = 1;
  }
  const MaxBuyTimes = mbt;
  if (buy == 0 && CGupgrade.canBuy) {
      CGupgrade.purchase(true);
      updateHTML();
    }

  if (buy == 1 && PDupgrade.canBuy) {
      PDupgrade.purchase(true);
      updateHTML();

  }

  if (buy == 2) {
    let i = 1;
    while (i <= MaxBuyTimes) {
      item = PU[5]
      let cost = new Decimal(item.cost)
      let h = new Decimal(item.pricemult)
      let g = new Decimal(protonupgrades[item.id][0])
      cost = cost.mul(h.pow(g))
      buypu(5, cost);
      i++;
    }
  }

}

function updateInstancesDisplay() {
  const instancesDiv = document.getElementById('instances');
  instancesDiv.innerHTML = '';

  MyObject.instances.forEach((instance, index) => {
      const instanceDiv = document.createElement('div');
      instanceDiv.classList.add('box');
      
      instanceDiv.innerHTML = `
          <p>Type: ${gettypetoname(instance.type)}</p>
          <p>Effects: ${geteffecttoname(instance.type,instance.effects,instance.level)}</p>
          <p>Level: ${instance.level}</p>
          <p>Status: ${instance.enabled ? 'Enabled' : 'Disabled'}</p>
          <button onclick="toggleInstance(${index})">Enable</button>
          <button onclick="deleteInstance(${index})">Delete</button>
      `;

      instancesDiv.appendChild(instanceDiv);
  });
}

function toggleInstance(index) {
  const instance = MyObject.instances[index];
     instance.enable();
    updateInstancesDisplay();
}

function disableall() {

MyObject.instances.forEach((instance, index) => {

instance.disable();

})
updateInstancesDisplay();
}

function deleteInstance(index) {
  if (MyObject.instances[index].enabled == 0) {
    MyObject.instances.splice(index, 1);
  }
  
  updateInstancesDisplay();
}

function gettypetoname(type) {

if (type == 0) {
  return "Carbon"
}
else if (type == 1) {
  return "Production"
}
else if (type == 2) {
  return "Boost"
}
else if (type == 3) {
  return "Proton"
}

}

function geteffecttoname(type,effect, level, rle) {
  returnstring = ""
  es = new Decimal(0);
  effect.forEach(element => {
    if (type == 0) {
      if (element == 0) {
        es = new Decimal(level).mul(4).pow(2)
        returnstring =  returnstring + " you gain +" + formatnum(es) + " Free CGs"
      }
      if (element == 1) {
        es = new Decimal(level).pow(2)
        returnstring =  returnstring + " you get +" + formatnum(es) + " CGs On buying CGs"
      }
      if (element == 2) {
        es = new Decimal(level).pow(1.5).mul(1.5)
        returnstring =  returnstring + " CGs are *" + formatnum(es) + " More effective"
      }
      if (element == 3) {
        es = new Decimal(level)
        returnstring =  returnstring + "On quark reset you gain " + formatnum(es) + " Carbon Destroyers"
      }
    }
    if (type == 1) {
      if (element == 0) {
        es = new Decimal(1.125).pow(new Decimal(level)).mul(4.67)
        returnstring =  returnstring + " Production speed mult *" + formatnum(es)
      }
      if (element == 1) {
        es = new Decimal(level).pow(1.002).mul(1.0015).div(1000)
        returnstring =  returnstring + " Proton cap is " + formatnum(es.mul(100)) + "% Higher based on the exponent of Production Speed."
      }
      if (element == 2) {
        es = (new Decimal(level).pow(0.1).plus(1).div(new Decimal(level).pow(0.1))).minus(1.01)
        returnstring =  returnstring + " Production Speed Price ^" + formatnum(es)
      }
      if (element == 3) {
        es = new Decimal(1.003).pow(new Decimal(level)).mul(1.0003)
        returnstring =  returnstring + " Production Speed generates Production Delay, at a rate of " + formatnum(es) + " Every 1000 production speed."
      }
    }
    if (type == 2) {
      if (element == 0) {
        es = new Decimal(level).pow(1.125).plus(1)
        returnstring =  returnstring + " The boost gain multiplier is increased by *" + formatnum(es)
      }
      if (element == 1) {
        es = new Decimal(level).pow(1.5).div(2).plus(1)
        returnstring =  returnstring + " Boost is *" + formatnum(es) + " Stronger"
      }
      if (element == 2) {
        ld = new Decimal(level)
        onum = Decimal.exp(new Decimal(-0.02).mul(ld))
        es = new Decimal(200).minus(new Decimal(195).mul(onum)).div(100)
        returnstring =  returnstring + " You gain " + formatnum(es.mul(100)) + "% of the boost you would get if you boosted every second."
      }
      if (element == 3) {
        ld = new Decimal(level).div(3000)
        onum = Decimal.exp(new Decimal(-0.02).mul(ld))
        es = new Decimal(200).minus(new Decimal(195).mul(onum)).div(100)
        returnstring =  returnstring + formatnum(es.mul(100)) + "% of the boost you have is converted into diminish every second"
      }
    }

    if (type == 3) {
      if (element == 0) {
        es = new Decimal(level).pow(1.625).times(50)
        returnstring =  returnstring + " You gain *" + formatnum(es) + " More protons"
      }
      if (element == 1) {
        es = new Decimal(level+5).mul(2)
        returnstring =  returnstring + " Production Reduction goes by *" + formatnum(es) + " Faster"
      }
      if (element == 2) {
        ld = new Decimal(level)
        es = ld.plus(5).pow(9)
        returnstring =  returnstring + " Proton cap *" + formatnum(es)
      }
      if (element == 3) {
        ld = new Decimal(level)
        es = Decimal.ceil(new Decimal(2).pow(ld.div(2)))
        returnstring =  returnstring + "On quark reset you gain " + formatnum(es) + "AntiProtons"
      }
    }


  });

  if (rle == 1) {

    return es;

  }

  else if (rle == 2) {

    return es.toString();

  }

  else {return returnstring;
  
  }

}

function switchMultiplierTab(id) {
  player.chosenMultiplier = id
}

// Initial display
updateInstancesDisplay();

function generateQuark(level, effects, type) {

new MyObject(type, effects, new Decimal(level))
updateInstancesDisplay();

}

function generaterandomQuark(level) {
  MEffects = 2;
  AmountOfEffects = 2;
  if (0 == 1) {
    AmountOfEffects++;
  }
  effects = generateUniqueRandomNumbers(1,AmountOfEffects,MEffects)
  type = Math.round(Math.random() * 3)
  return generateQuark(level,effects,type)
}

function generateUniqueRandomNumbers(min, max, count) {
  if (count > (max - min + 1)) {
      throw new Error("Count of unique numbers requested exceeds the range.");
  }

  const uniqueNumbers = new Set();
  const result = [];

  while (uniqueNumbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!uniqueNumbers.has(randomNum)) {
          uniqueNumbers.add(randomNum);
          result.push(randomNum);
      }
  }

  return result;
}
updateInstancesDisplay();

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
  if (event.key === 'm') {
    buymax(0,512)
    buymax(1,512)
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'c') {
    buymax(0,512)
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'p') {
    buymax(1,512)
  }
});

if (!dev.disableStartInterval) setInterval(function() {tick(1)}, 10)
setTimeout(loadlssave, 1);
updateHTML()

document.addEventListener('DOMContentLoaded', () => {
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
