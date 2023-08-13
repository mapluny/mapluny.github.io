let save = {
  carbon: new Decimal(10),
  highestcarbonthisreset: new Decimal(10),
  productionreduction: new Decimal(1),

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
    boostupgrades: [
      [0, "3"],
      [0, "10"],
      [0, "1e3"],
      [0, "2.4e3"],
      [0, "1e4"],
      [0, "1e5"],
    ],
  },

  // Proton Stuff
  proton: {
    protons: new Decimal("0"),
    protongainedonreset: new Decimal(1),
    protonupgrades: [
      [0, "3"],
      [0, "3"],
      [0, "3"],
      [0, "9"],
      [0, "9"],
      [0, "9"],
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
  },

  
};
function loadSave(savedData) {
	if(saveData.carbon == null){
			resetsaves();
			return;
		}
		
    carbon = new Decimal(savedData.carbon);
    highestcarbonthisreset = new Decimal(savedData.highestcarbonthisreset);
    productionreduction = new Decimal(savedData.productionreduction);
  
    cg = new Decimal(savedData.carbonGenerators.cg);
    cgcost = new Decimal(savedData.carbonGenerators.cgcost);
    cgboughttimes = new Decimal(savedData.carbonGenerators.cgboughttimes);
    cgmult = new Decimal(savedData.carbonGenerators.cgmult);
  
    pd = new Decimal(savedData.productionSpeed.pd);
    pdcost = new Decimal(savedData.productionSpeed.pdcost);
    pdboughttimes = new Decimal(savedData.productionSpeed.pdboughttimes);
    pdcostpower = new Decimal(savedData.productionSpeed.pdcostpower);
    autobuyers = [...savedData.productionSpeed.autobuyers];
  
    boost = new Decimal(savedData.boost.boost);
    boostgainedonreset = new Decimal(savedData.boost.boostgainedonreset);
    boostupgrades = [...savedData.boost.boostupgrades];
  
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
  }
  
  function saveData() {
    const savedData = {
        carbon: carbon.toString(),
        highestcarbonthisreset: highestcarbonthisreset.toString(),
        productionreduction: productionreduction.toString(),

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
            autobuyers: [...autobuyers]
        },

        boost: {
            boost: boost.toString(),
            boostgainedonreset: boostgainedonreset.toString(),
            boostupgrades: [...boostupgrades]
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
        }
    };

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
    // Reset all variables and properties to their initial values
    carbon = new Decimal(10);
    highestcarbonthisreset = new Decimal(10);
    productionreduction = new Decimal(1);

    // Reset Carbon Generators
    cg = new Decimal(0);
    cgcost = new Decimal(10);
    cgboughttimes = new Decimal(0);
    cgmult = new Decimal(1);

    // Reset Production Speed
    pd = new Decimal(1);
    pdcost = new Decimal(100);
    pdboughttimes = new Decimal(0);
    pdcostpower = new Decimal(1);
    autobuyers = [1, 1];

    // Reset Boost Stuff
    boost = new Decimal("1");
    boostgainedonreset = new Decimal(0);
    boostupgrades = [
        [0, "3"],
        [0, "10"],
        [0, "1e3"],
        [0, "2.4e3"],
        [0, "1e4"],
        [0, "1e5"],
    ];

    // Reset Proton Stuff
    protons = new Decimal("0");
    protongainedonreset = new Decimal(1);
    protonupgrades = [
        [0, "3"],
        [0, "3"],
        [0, "3"],
        [0, "9"],
        [0, "9"],
        [0, "9"],
        [0, "1e5"],
        [0, "1e5"],
        [0, "1e5"],
    ];
    plimit = new Decimal("1e10");

    // Reset Quark Stuff
    qresettimes = new Decimal("0");
    canqreset = 0;
    togqreset = false;
    
    // Save the reset state
    setsave();
}

// Call resetsave function when needed
// For example, you can call it when a "Reset" button is clicked
// resetButton.addEventListener("click", resetsave);

setInterval(setsave, 10000);