let save = {
  carbon: new Decimal(10),
  highestcarbonthisreset: new Decimal(10),
  productionreduction: new Decimal(1),
  totalcarbonthisreset: new Decimal(0),
  progression: 0,
  time: Date.now(),
  TimeSinceQuarkReset: 0,
  buyableSets: {},

  // Carbon Generators
  carbonGenerators: {
    cg: new Decimal(0),
    cgcost: new Decimal(10),
    cgboughttimes: new Decimal(0),
    cgmult: new Decimal(1),
  },

  // Production Speed
  productionSpeed: {
    pd: new Decimal(1),
    pdcost: new Decimal(100),
    pdboughttimes: new Decimal(0),
    pdcostpower: new Decimal(1),
    autobuyers: [1, 1],
  },

  // Boost Stuff
  boost: {
    boost: new Decimal("1"),
    boostgainedonreset: new Decimal(0),
  },

  // Proton Stuff
  proton: {
    protons: new Decimal("0"),
    protongainedonreset: new Decimal(1),
    protonupgrades: [
      [0, "3"],
      [0, "3"],
      [0, "3"],
      [0, "243"],
      [0, "243"],
      [0, "243"],
      [0, "1e5"],
      [0, "1e5"],
      [0, "1e5"],
    ],
    plimit: new Decimal("1e10"),
  },

  // Quark Stuff
  quark: {
    qresettimes: new Decimal("0"),
    canqreset: 0,
    togqreset: false,
    myObjects: MyObject.instances.map(instance => ({
      type: instance.type,
      effects: instance.effects,
      level: instance.level,
      enabled: instance.enabled
  })),
  ExoticMatter: new Decimal("0"),
  HCQR: new Decimal(0),
  HPDQR: new Decimal(0),
  Qupgrades: [
    [0,"8"],
    [0,"8"],
    [0,"8"],
    [0,"64"],
    [0,"64"],
    [0,"64"],
  ]
  },

  antistuff: {
    CarbonDestroyers: new Decimal(0),
    ProductionDelay: new Decimal(0),
    Diminish: new Decimal(0),
    AntiProtons: new Decimal(0)
  },

  
};
function loadSave(savedData) {
  for (const key in savedData) {
    if (player[key]) {
      let val = saveData[key];
      if (isDecimal(player[key])) player[key] = new Decimal(savedData[key])
      else player[key] = savedData[key];
    }
  }
    carbon = new Decimal(savedData.carbon);
    highestcarbonthisreset = new Decimal(savedData.highestcarbonthisreset);
    productionreduction = new Decimal(savedData.productionreduction);
    totalcarbonthisreset = new Decimal(savedData.totalcarbonthisreset);
    progression = savedData.progression;
    time = savedData.time,
    TimeSinceQuarkReset = savedData.TimeSinceQuarkReset,
  
    cg = new Decimal(savedData.carbonGenerators.cg);
    cgcost = new Decimal(savedData.carbonGenerators.cgcost);
    cgboughttimes = new Decimal(savedData.carbonGenerators.cgboughttimes);
    cgmult = new Decimal(savedData.carbonGenerators.cgmult);
  
    pd = new Decimal(savedData.productionSpeed.pd);
    pdcost = new Decimal(savedData.productionSpeed.pdcost);
    pdboughttimes = new Decimal(savedData.productionSpeed.pdboughttimes);
    pdcostpower = new Decimal(savedData.productionSpeed.pdcostpower);
  
    boost = new Decimal(savedData.boost.boost);
    boostgainedonreset = new Decimal(savedData.boost.boostgainedonreset);
  
    protons = new Decimal(savedData.proton.protons);
    protongainedonreset = new Decimal(savedData.proton.protongainedonreset);
    protonupgrades = [...savedData.proton.protonupgrades];
    plimit = new Decimal(savedData.proton.plimit);
  
    qresettimes = new Decimal(savedData.quark.qresettimes);
    canqreset = savedData.quark.canqreset;
    togqreset = savedData.quark.togqreset;
    MyObject.instances = savedData.quark.myObjects.map(data => {
      const instance = new MyObject(data.type, data.effects, data.level);
      instance.enabled = data.enabled;
      return instance;
  });
    ExoticMatter = new Decimal(savedData.quark.ExoticMatter)
    HCQR = new Decimal(savedData.quark.HCQR)
    HPDQR = new Decimal(savedData.quark.HPDQR)
    Qupgrades = savedData.quark.Qupgrades
    CarbonDestroyers = new Decimal(savedData.antistuff.CarbonDestroyers);
    ProductionDelay = new Decimal(savedData.antistuff.ProductionDelay);
    Diminish = new Decimal(savedData.antistuff.Diminish);
    AntiProtons = new Decimal(savedData.antistuff.AntiProtons);
    for (const key in savedData.buyableSets) {
      if (buyableSets[key]) {
          buyableSets[key] = new Decimal(savedData.buyableSets[key]);
      } else {
          buyableSets[key] = new Decimal(0);
      }
  }
  for (const key in savedData.autobuyers) {
    if (autobuyers[key]) {
      autobuyers[key] = savedData.autobuyers[key];
    } else {
      autobuyers[key] = false;
    }
}
    updateHTML()
  }
  
  function saveData() {
    const buyableSetsData = {};
    for (const key in buyableSets) {
        buyableSetsData[key] = buyableSets[key].toString();
    }
    const savedData = {
        carbon: carbon.toString(),
        highestcarbonthisreset: highestcarbonthisreset.toString(),
        productionreduction: productionreduction.toString(),
        totalcarbonthisreset: totalcarbonthisreset.toString(),
        progression: progression,
        time: Date.now(),
        TimeSinceQuarkReset: TimeSinceQuarkReset,
        buyableSets: buyableSetsData,

        carbonGenerators: {
            cg: cg.toString(),
            cgcost: cgcost.toString(),
            cgboughttimes: cgboughttimes.toString(),
            cgmult: cgmult.toString()
        },

        productionSpeed: {
            pd: pd.toString(),
            pdcost: pdcost.toString(),
            pdboughttimes: pdboughttimes.toString(),
            pdcostpower: pdcostpower.toString(),
        },

        boost: {
            boost: boost.toString(),
            boostgainedonreset: boostgainedonreset.toString(),
        },

        proton: {
            protons: protons.toString(),
            protongainedonreset: protongainedonreset.toString(),
            protonupgrades: [...protonupgrades],
            plimit: plimit.toString()
        },

        quark: {
            qresettimes: qresettimes.toString(),
            canqreset: canqreset,
            togqreset: togqreset,
            myObjects: MyObject.instances.map(instance => ({
              type: instance.type,
              effects: instance.effects,
              level: instance.level,
              enabled: instance.enabled
          })),
          ExoticMatter: ExoticMatter,
          HCQR: HCQR,
          HPDQR: HPDQR,
          Qupgrades: Qupgrades,
        },

        antistuff: {
          CarbonDestroyers: CarbonDestroyers.toString(),
          ProductionDelay: ProductionDelay.toString(),
          Diminish: Diminish.toString(),
          AntiProtons: AntiProtons.toString()
        },
    };

    for (const key in player) {
      let val = player[key];
      if (isDecimal(val)) savedData[key] = player[key].toString();
      else savedData[key] = player[key]
    }
    for (const key in autobuyers) {
      savedData["autobuyers"][key] = autobuyers[key];
  }

    return savedData;
}

function setsave() {
    save = saveData();
    localStorage.setItem("save",JSON.stringify(save));
    showNotification("game saved")
}

function loadlssave() {
    csave = JSON.parse(localStorage.getItem('save'));
    loadSave(csave)
}
function resetsaves() {
    localStorage.clear()
    location.reload();
}

setInterval(setsave, 30000);