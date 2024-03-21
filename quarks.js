// TBD

function getqlevel(floor) {
    let boostL = Currencies.boost.value.log10().div(230)
    let protonL = (Currencies.protons.value.log10().div(70))
    let finalnum = boostL.mul(protonL)
    if (!floor) {
      return Decimal.max(finalnum,1)
    }
    if (floor) {
      return Decimal.max(Decimal.floor(finalnum),1)
    }
  }

  function GetEmGained(carbon) {
    return new Decimal(25).pow(carbon.log10().div(400).minus(1));
  }

  function reset2() {
    qlevel = getqlevel(true);
    if (canqreset == 1) {
    ExoticMatter = ExoticMatter.plus(GetEmGained(carbon))
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
    protonData.resetUpgrades()
    Currencies.nanoBot.setValue(new Decimal(1))
    if (togqreset == true) {
        disableall()
    }
    Boostupgrade.reset()
    }
  }

class Quark {
    constructor(config) {
        this._config = config
        config["id"] = Object.keys(player.quarkInventory).length
        player.quarkInventory.push(this)
    }

    static getEffectValueFromActiveEffect(type, effectId) {
        let mul = new Decimal(1)
        this.getActive().forEach(eff => {
            if (eff.type==type && eff.effectId.find(e => e==effectId)) {

            }
        })
    }

    static getActive() {
        let arr = []
        player.activeQuarks.forEach(id => {
            if (!player.quarkInventory[id]) throw Error("Quark with id" + id + " does not exist, (Trying to get active nonexistant Quark)");
            arr.push(player.quarkInventory[id])
        });
        return arr
    }

    static deleteAll() {
        for (key in player.quarkInventory) {
            delete player.quarkInventory[key]
        }
    }

    static getEffectsFromType(type) {
        let arr = []
        for (key in quarkEffects) {
            let effect = quarkEffects[key]
            if (effect.type==type) {
                arr.push(effect)
            }
        }
        return arr
    }

    static getEffectsFromArray(type, arr) {
        let effarr = []
        arr.forEach(array => {
        effarr.push(this.getEffectsFromType(type).find(eff => eff.id==array))
        });
        return effarr
    }

    get config() {
        return this._config
    }

    get id() {
        return this.config.id
    }

    get type() {
        return this.config.type
    }

    effectValueForID(id) {
        let EffectsArr = getEffectsFromType(this.type)
        let Effect = EffectsArr.find(eff => eff.id==id)
        if (Effect==undefined) error("Cannot find effect with an id of " + id + " for Quark type " + this.type);
        return Effect.effect(this.level)
    }

    get level() {
        return this.config.level
    }

    get effects() {
        return this.config.effects
    }
}

quarkEffects = {
    carbon1: {
        id:0,
        type:"carbon",
        description: "Multiply Carbon generation",
        effect: (level) => {
            return new Decimal("1e2").pow(level).pow(0.5).times(842)
        },
        scaling: "MULT"
    },
    carbon2: {
        id:1,
        type:"carbon",
        description: "Increase effective Carbon Generators for Carbon Generation Bonding",
        effect: (level) => {
            return new Decimal("5").times(level).pow(0.95)
        },
        scaling: "MULT"
    },
    carbon3: {
        id:2,
        type:"carbon",
        description: "Multiply Carbon Generator Bonding Strength",
        effect: (level) => {
            return new Decimal("1.2").pow(level).times(1.15).plus(1)
        },
        scaling: "MULT"
    },
}