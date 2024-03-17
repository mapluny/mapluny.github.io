// The Buyable Sets took so long to figure out :(

class SetRebuyable {
    constructor(config) {
        this._config = config
        SetRebuyable.instances.push(this)
        if (!JSON.parse(localStorage.save).buyableSets[this.config.set]) {
            buyableSets[this.config.set] = new Decimal(0);
        }
        else {
            buyableSets[this.config.set] = JSON.parse(localStorage.save).buyableSets[this.config.set];
        }
    }

    static instances = [];

    static getInstanceBySet(name) {
        return SetRebuyable.instances.find(instance => instance.config.set === name);
    }

    get config() {
        return this._config
    }

    get name() {
        return this.config.name
    }

    get cost() {
        return this.config.cost(this.set)
    }

    get canBuy() {
        // CG set likes to be a string or something for a second :(
        try {
            if (this.set.gte(this.maxPurchases)) return false
            return this.currency.value.gte(this.cost)
        } catch (error) {
                this.set = new Decimal(this.set);
                return this.canBuy;
        }
    }

    get currency() {
        return this.config.currency()
    }

    get set() {
        return buyableSets[this.config.set]
    }

    set set(value) {
        buyableSets[this.config.set] = value
    }

    get maxPurchases() {
        return this.config.maxPurchases
    }

    get maxBought() {
        return this.config.buymax()
    }

    get toolTip() {
        if (!this.config.toolTip) return false
        return this.config.toolTip
    }

    purchase(max) {
        if (!this.canBuy) return
        if (max) {
            let maxb = this.maxBought.min(this.maxPurchases)
            this.currency.sub(this.config.cost(maxb))
            this.currency.setValue(this.currency.value.max(0))
            if (isDecimal(this.set)) this.set = (this.set.plus(maxb))
            if (!isDecimal(this.set)) this.set = (this.set + maxb)
            return
        }
        this.currency.sub(this.cost)
        if (isDecimal(this.set)) this.set = (this.set.plus(1))
        if (!isDecimal(this.set)) this.set = (this.set + 1)
    }
}

let buyableSets = {}

CGupgrade = new SetRebuyable({
 name: "Carbon Generator",
 cost: (x) => new Decimal(10).times(new Decimal(1.15).pow(x)),
 buymax: () => {
    let set = buyableSets["cg"]
    return Decimal.affordGeometricSeries(Currencies.carbon.value, new Decimal(10), new Decimal(1.15), set)
 },
 set: `cg`,
 currency: () => Currencies.carbon,
 maxPurchases: Infinity,
})

PDupgrade = new SetRebuyable({
    name: "Production Speed",
    cost: (x) => new Decimal(100).times(new Decimal(10).pow(x)),
    buymax: () => {
        let set = buyableSets["pd"]
        return Decimal.affordGeometricSeries(Currencies.carbon.value, new Decimal(100), new Decimal(10), set)
     },
    set: `pd`,
    currency: () => Currencies.carbon,
    maxPurchases: Infinity,
   })

Boostupgrade = new SetRebuyable({
    name: "Bonding Generators",
    cost: (x) => {
        // Pre set first 3 costs
        let dcx = new Decimal(x)
        if (dcx.eq(0)) return new Decimal("1e3")
        if (dcx.eq(1)) return new Decimal("5e3")
        if (dcx.eq(2)) return new Decimal("5e4")
        return new Decimal("1e3").times(Decimal.pow(4.5, x).pow(x))
        },
    set: `bu`,
    currency: () => Currencies.boost,
    maxPurchases: Infinity,
   })

let ProtonUpgradesData = {
    p1: {
        name: "Stronger Boost",
        cost: "2",
        info: "Boost multiplier to Carbon Generation is increased (log3(x)^2+1 -> log1.5((5^log3(x)^2+1)^1.5)"
    },
    p2: {
        name: "Enhanced Formula",
        cost: "2",
        info: "Boost gain formula is improved (10^(log10(carbon)/2)-30.338 -> 10.23^(log10(carbon)/1.78))"
    },
    p3: {
        name: "Faster Production Speed",
        cost: "3",
        info: "Production Speed is faster (buy mult x1.5 -> x1.5 + 0.65)"
    },
    p4: {
        name: "Enhanced Formula v2",
        cost: "30",
        info: "Boost gain formula is improved, based on Carbon Generators (x * carbonGenerators^1.44)"
    },
    p5: {
        name: "Protonic Boost",
        cost: "30",
        info: "Gain more boost based on Protons(x * protons)"
    },
    p6: {
        name: "Ultimate Bond",
        cost: "100",
        info: "Increase the strength of Carbon Bonding per Carbon Generator (x * (2 + log10(carbonGenerators)))"
    },
    p7: {
        name: "Carbon fueled Carbon",
        cost: "500",
        info: "Gain more Carbon based on your current Carbon (x * log2(Carbon+2)^1.5)"
    },
    p8: {
        name: "Nano Tech",
        cost: "5e3",
        info: "Unlock Nano Bots, which are generated on a base of +1/s they reset on Proton Crush, Nano Bots affect Carbon Generation (x * nanoBots^2), they also make the Production Reduction from crushing decrease faster (x/1.5 -> x/(1.5*log2(nanobot)^2*10))"
    },
    p9: {
        name: "Speed Bonding",
        cost: "5e5",
        info: "Production Speed increases the strength of Carbon Bonding (x * productionspeed^0.1), and improve Carbon Bonding Formula (bondingstrength^(carbongenerators^0.12) -> bondingstrength^(carbongenerators^0.12*(log10(carbongenerators))))"
    },
    p10: {
        name: "Tech Improvement",
        cost: "1e30",
        info: "Nano bots generate faster based on Protons (x * log10(protons)^2)"
    },
    p11: {
        name: "Boost Improvement",
        cost: "1e48",
        info: "Boost multiplier to Carbon Generation is increased (x * x^0.65)"
    },
    p12: {
        name: "Bonding Boost",
        cost: "1e55",
        info: "Boost Upgrade scales better ((x^2+1.01)^1.02 -> (2^x)^0.5+500)"
    },
}

for (key in ProtonUpgradesData) {
    let upg = ProtonUpgradesData[key]
    new SetRebuyable({
        name: upg.name,
        cost: (x) => new Decimal(upg.cost),
        currency: () => Currencies.protons,
        set: key,
        maxPurchases: 1,
        toolTip: upg.info,
    })
}