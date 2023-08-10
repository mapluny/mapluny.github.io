let carbon = new Decimal(10);
let highestcarbonthisreset = new Decimal(10);
let productionreduction = new Decimal(1);

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
let boostupgrades = [
  [0, "3"],
  [0, "10"],
	[0, "1e3"],
  [0, "2.4e3"],
  [0, "1e4"],
  [0, "1e5"]
]
// Proton Stuff
let protons = new Decimal("0");
let protongainedonreset = new Decimal(1);
let protonupgrades = [
[0,"3"],
[0,"3"],
[0,"3"],
[0,"9"],
[0,"9"],
[0,"9"],
[0,"1e5"],
[0,"1e5"],
[0,"1e5"],
]
let plimit = new Decimal("1e10");
let prspeed = new Decimal("1");

// Quark Stuff
let qresettimes = new Decimal("0")
let canqreset = 0;
let togqreset = false;

function formatnum(number) {
  const num = new Decimal(number);

  if (num.gte(1000)) {
    string = num.toExponential(2);
    string = string.split("+").join('');
    return string;
  } else {
    return num.toSD(3).toString();
  }
}

// Get DOM elements
const pointsDisplay = document.getElementById("ca");
const cgs = document.getElementById("cgs");
const cgcostd = document.getElementById("cgcost");
const pdd = document.getElementById("cps");
const pdcostd = document.getElementById("pdcost");
const boostd = document.getElementById("boost");
const protonsd = document.getElementById("protons");
const pdrd = document.getElementById("pdr");
const dqr = document.getElementById("dqr");
const pl = document.getElementById("pl");
const qleveld = document.getElementById("qlevel");

function tick() {
  quarksen = MyObject.getEnabledCount;
  plimit = new Decimal("1e10")
  prspeed = new Decimal("1");

if (protons.gte("9.99e9") && boost.gte("1e15")) {
canqreset = 1;
}
else {canqreset = 0;}
let freecgmult = new Decimal(1);
let bstrength = new Decimal(1);
pdcostpower = new Decimal(1);
cg = new Decimal(cgboughttimes);
let cgmult = new Decimal(1);



pd = new Decimal(1.5).pow(pdboughttimes);
  boostupgrades.forEach(upgrade => {

    if (boost.gte(new Decimal(upgrade[1]))) {
      upgrade[0] = 1;
    }

  });

  let freecgs = new Decimal(0);
  bgor = Decimal.log(highestcarbonthisreset.times(2)).minus(2);
  if (boostupgrades[0][0] == 1) {
    freecgs = freecgs.plus(10);
  }
  if (boostupgrades[1][0] == 1) {
    bgor = bgor.pow(2).times(7);
  }
  if (boostupgrades[2][0] == 1) {
    freecgs = freecgs.plus(90);
  }
  if (boostupgrades[3][0] == 1) {
    bgor = bgor.times(pd);
  }
  if (boostupgrades[4][0] == 1) {
    bgor = bgor.plus(cg.plus(freecgs).times(20));
  }

	if (protonupgrades[0][0] == 1) {
	bstrength = bstrength.times(10);
	}
	if (protonupgrades[1][0] == 1) {
	bgor = bgor.mul(Decimal.log(bgor.plus(10)));
	}
	if (protonupgrades[2][0] == 1) {
	pd = pd.mul(2);
	}
	if (protonupgrades[3][0] == 1) {
	freecgs = freecgs.plus(pd.mul(2))
	}
	if (protonupgrades[4][0] == 1) {
	freecgs = freecgs.plus(125)
	freecgs = freecgs.plus(protons)
	}
	if (protonupgrades[5][0] == 1) {
	pd = pd.mul(boost.pow(0.5))
	}
	if (protonupgrades[6][0] == 1) {
	freecgmult = freecgmult.mul(2)
	}
	if (protonupgrades[7][0] == 1) {
	bgor = bgor.mul(Decimal.log(protons))
	}
	if (protonupgrades[8][0] == 1) {
	bgor = bgor.pow(1.5);
	}


  highestcarbonthisreset = Decimal.max(carbon, highestcarbonthisreset);

	protongainedonreset = Decimal.round(carbon.div("5e7").pow(0.3));

	if (bgor.gte("1e15")) {

	bgor = Decimal.max(bgor.div(bgor.pow(0.3)),"1e15")
	
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
        }
        if (t == 1) {
          if (element == 0) {
            es = geteffecttoname(t,[element],l,1)
            pd = pd.mul(es)
          }
          if (element == 1) {
            es = geteffecttoname(t,[element],l,1)
            pdlog = Decimal(pd.plus(1))
            plimit = plimit.mul(es.plus(1).mul(pdlog.mul(0.01)))
          }
          if (element == 2) {
            es = geteffecttoname(t,[element],l,1)
            pdcostpower = pdcostpower.mul(es);
          }
        }

        if (t == 2) {
          if (element == 0) {
            es = geteffecttoname(t,[element],l,1)
            bgor = bgor.mul(es)
          }
          if (element == 1) {
            es = geteffecttoname(t,[element],l,1)
            bstrength = bstrength.mul(es)
          }
          if (element == 2) {
            es = geteffecttoname(t,[element],l,1)
            newboost = boostgainedonreset.mul(es)
            boost = boost.plus(newboost.div(100))
          }
        }

        if (t == 3) {
          if (element == 0) {
            es = geteffecttoname(t,[element],l,1)
            protongainedonreset = protongainedonreset.mul(es)
          }
          if (element == 2) {
            es = geteffecttoname(t,[element],l,1)
            prspeed = prspeed.mul(es)
          }
          if (element == 3) {
            es = geteffecttoname(t,[element],l,1)
            plimit.mul(es)
          }
        }
    
    
      });
    }
}
  boostgainedonreset = Decimal.max(bgor, 0);
  productionreduction = getnextproductionreduction(prspeed);

	freecgs = freecgs.mul(freecgmult);

  newc = cg.plus(freecgs).times(cgmult).times(pd).times(boost.times(bstrength));

  carbon = carbon.plus(newc.div(new Decimal(100).mul(productionreduction)));
  power = new Decimal(10).plus(Decimal.max(pdboughttimes.mul(5).minus(1540),0))
  pdcost = new Decimal(100).times(power.pow(pdboughttimes));
  pdcost = pdcost.pow(pdcostpower)

  if (protons.gt(plimit)) {
    protons = plimit.minus(1);
    }


  pointsDisplay.textContent = formatnum(carbon);
  pdrd.textContent = formatnum(new Decimal(100).mul(productionreduction).minus(99));
  cgs.textContent = formatnum(cg.plus(freecgs));
  cgcostd.textContent = formatnum(cgcost);
  pdd.textContent = formatnum(pd);
  pdcostd.textContent = formatnum(pdcost);
  boostd.textContent = formatnum(boost) + " + " + formatnum(boostgainedonreset);
	protonsd.textContent = formatnum(protons) + " + " + formatnum(protongainedonreset);
  dqr.textContent = togqreset ? "yes" : "no";
  pl.textContent = formatnum(plimit);
  qleveld.textContent = formatnum(Decimal.max(getqlevel(true),1));
	document.getElementById("buypu1").disabled = protonupgrades[0][0];
	document.getElementById("buypu2").disabled = protonupgrades[1][0];
	document.getElementById("buypu3").disabled = protonupgrades[2][0];
	document.getElementById("buypu4").disabled = protonupgrades[3][0];
	document.getElementById("buypu5").disabled = protonupgrades[4][0];
	document.getElementById("buypu6").disabled = protonupgrades[5][0];
	document.getElementById("buypu7").disabled = protonupgrades[6][0];
	document.getElementById("buypu8").disabled = protonupgrades[7][0];
	document.getElementById("buypu9").disabled = protonupgrades[8][0];

}

function getnextproductionreduction(pspeed) {
  return Decimal.max(productionreduction.div(new Decimal(1.009).mul(pspeed)).minus(new Decimal(0.0001).mul(pspeed)),1);
}

function buycg() {

  if (carbon.gte(cgcost)) {
    carbon = carbon.minus(cgcost);
    cgboughttimes = cgboughttimes.plus(1);
    cgcost = new Decimal(1.5).pow(cgboughttimes.plus(1));
    cg = cg.plus(1);
  }

}

function buypd() {
  if (carbon.gte(pdcost)) {
    carbon = carbon.minus(pdcost);
    pdboughttimes = pdboughttimes.plus(1);
    power = new Decimal(10).plus(Decimal.max(pdboughttimes.minus(308),0))
    pdcost = new Decimal(100).times(power.pow(pdboughttimes));
  }

}

function togquarks() {
  togqreset = !togqreset;
}

function reset1() {
  carbon = new Decimal(10);
  cg = new Decimal(0);
  cgboughttimes = new Decimal(0);
  cgcost = new Decimal(10);
  highestcarbonthisreset = new Decimal(10);
  pd = new Decimal(1);
  pdcost = new Decimal(100);
  pdboughttimes = new Decimal(0);
  cgmult = 0;

  boost = boost.plus(boostgainedonreset);


}

function reset2() {
  qlevel = getqlevel(true, false, [0,1]);
  if (canqreset == 1){
    reset1()
    boostgainedonreset = new Decimal(0);
    boost = new Decimal(1);
    protons = new Decimal(0);
    productionreduction = new Decimal(1);
    boostupgrades.forEach(upg => {
  
      upg[0] = 0;
  
    })
  
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

function pcrush() {
if (protongainedonreset.gte(1) && boostupgrades[5][0] == 1){

productionreduction = productionreduction.plus(protongainedonreset.pow(1.33))
carbon = new Decimal(10);
protons = protons.plus(protongainedonreset);
}
}

function buypu(upgid) {
let upgcost = protonupgrades[upgid][1];
if (protons.gte(new Decimal(upgcost)) ) {
protons = protons.minus(upgcost)
protonupgrades[upgid][0]++;
console.log(protonupgrades[upgid])
}
}

function autobuy() {

  if (boostupgrades[1][0] == 1) {
      if (autobuyers[0] == 1) {
    let i = 1;
    while (i <= 512) {
      buycg();
      i++;
    }

  }

  if (autobuyers[1] == 1) {
    let i = 1;
    while (i <= 512) {
      buypd();
      i++;
    }

  }
  }




}

function updateInstancesDisplay() {
  const instancesDiv = document.getElementById('instances');
  instancesDiv.innerHTML = '';

  MyObject.instances.forEach((instance, index) => {
      const instanceDiv = document.createElement('div');
      instanceDiv.classList.add('box'); // Add the 'box' class to the div
      
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
        returnstring =  returnstring + ", you gain +" + formatnum(es) + " Free CGs"
      }
      if (element == 1) {
        es = new Decimal(level).pow(2)
        returnstring =  returnstring + ", you get +" + formatnum(es) + " CGs On buying CGs"
      }
      if (element == 2) {
        es = new Decimal(level).pow(1.5).mul(1.5)
        returnstring =  returnstring + ", CGs are *" + formatnum(es) + " More effective"
      }
    }
    if (type == 1) {
      if (element == 0) {
        es = new Decimal(1.125).pow(new Decimal(level)).mul(4.67)
        returnstring =  returnstring + ", Production speed mult *" + formatnum(es)
      }
      if (element == 1) {
        es = new Decimal(level).pow(1.005).mul(1.015).div(1000)
        returnstring =  returnstring + ", Proton cap is " + formatnum(es.mul(100)) + "% Higher based on the exponent of Production Speed."
      }
      if (element == 2) {
        es = (new Decimal(level).pow(0.1).plus(1).div(new Decimal(level).pow(0.1))).minus(1.01)
        returnstring =  returnstring + ", Production Speed Price multiplier ^" + formatnum(es)
      }
    }
    if (type == 2) {
      if (element == 0) {
        es = new Decimal(level).pow(1.125).plus(1)
        returnstring =  returnstring + ", The boost gain multiplier is increased by *" + formatnum(es)
      }
      if (element == 1) {
        es = new Decimal(level).pow(1.5).div(2).plus(1)
        returnstring =  returnstring + ", Boost is *" + formatnum(es) + " Stronger"
      }
      if (element == 2) {
        ld = new Decimal(level)
        onum = Decimal.exp(new Decimal(-0.02).mul(ld))
        es = new Decimal(200).minus(new Decimal(195).mul(onum)).div(100)
        returnstring =  returnstring + ", You gain " + formatnum(es.mul(100)) + "% of the boost you would get if you boosted every second."
      }
    }

    if (type == 3) {
      if (element == 0) {
        es = new Decimal(level).pow(1.625).times(50)
        returnstring =  returnstring + ", You gain *" + formatnum(es) + " More protons"
      }
      if (element == 1) {
        es = new Decimal(5).pow(level).pow(0.5)
        returnstring =  returnstring + ", Production Reduction goes by *" + formatnum(es) + " Faster"
      }
      if (element == 2) {
        ld = new Decimal(level)
        es = ld.plus(5).pow(10)
        returnstring =  returnstring + ", Proton cap *" + formatnum(es)
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

// Initial display
updateInstancesDisplay();

function generateQuark(level, effects, type) {

new MyObject(type, effects, new Decimal(level))
updateInstancesDisplay();

}

function generaterandomQuark(level) {
  effects = generateUniqueRandomNumbers(1,3,2)
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

loadlssave();
updateInstancesDisplay();

function resetsave() {
  const buttons = [
    {
      text: "RESET NOW",
      clickHandler: () => {
        resetsaves();
        modalLibrary.showModal("<p>Save reset.</p>", []);
        console.log("WORK");
      }
    },
  ];
  
  modalLibrary.showModal("<p>Are you sure?</p>", buttons);
  
}

setInterval(tick, 10)
setInterval(autobuy, 100)