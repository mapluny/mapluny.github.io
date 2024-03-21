// The Buyable Sets took so long to figure out :(

class SetRebuyable {
    constructor(config) {
        this._config = config
        SetRebuyable.instances.push(this)
        if (localStorage.save) {
            if (!JSON.parse(localStorage.save).buyableSets[this.config.set]) {
                buyableSets[this.config.set] = new Decimal(0);
            }
            else {
                buyableSets[this.config.set] = JSON.parse(localStorage.save).buyableSets[this.config.set];
            }
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

    get buymaxPrice() {
        if (!this.config.buymaxPrice) return this.cost
        return this.config.buymaxPrice()
    }

    get subFromCurrency() {
        if (this.config.subFromCurrency == undefined) return true
        return this.config.subFromCurrency
    }

    get maxBought() {
        return this.config.buymax()
    }

    get otherData() {
        if (!this.config.data) return []
        return this.config.data
    }

    get toolTip() {
        if (!this.config.toolTip) return false
        return this.config.toolTip
    }

    purchase(max) {
        if (!this.canBuy) return
        if (max) {
            let maxb = this.maxBought.min(this.maxPurchases)
            this.subFromCurrency ? this.currency.sub(this.buymaxPrice) : undefined
            if (isDecimal(this.set)) this.set = (this.set.plus(maxb))

            // pretty sure a set will always be a Decimal, but I might do something weird later so idk.
            
            if (!isDecimal(this.set)) this.set = (this.set + maxb)
            return
        }
        this.subFromCurrency ? this.currency.sub(this.cost) : undefined
        if (isDecimal(this.set)) this.set = (this.set.plus(1))
        if (!isDecimal(this.set)) this.set = (this.set + 1)
    }

    reset() {
        this.set = new Decimal(0)
    }
}

let buyableSets = {}

let superExponentials = {
    bondingGen: new superExponential({
        b: new Decimal("1e3"),
        t: new Decimal("4.5")
    }),
    nanoPower: new superExponential({
        b: new Decimal("1e30"),
        t: new Decimal("1e70")
    }),
    nanoSpeed: new superExponential({
        b: new Decimal("5e6"),
        t: new Decimal("5e5")
    })
}

let CGupgrade = new SetRebuyable({
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

let PDupgrade = new SetRebuyable({
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

let Boostupgrade = new SetRebuyable({
    name: "Bonding Generators",
    cost: (x) => {
        // Pre set first 3 costs
        let dcx = new Decimal(x)
        if (dcx.eq(0)) return new Decimal("1e3")
        if (dcx.eq(1)) return new Decimal("5e3")
        if (dcx.eq(2)) return new Decimal("2e5")

        // Cant use the superExponentials cause it gets mad at me for some reason

        return new Decimal("1e3").times(Decimal.pow(4.5, x).pow(x))
        },
    buymax: () => {
        let availableCurrency = Currencies.boost.value
        let maxBought = superExponentials.bondingGen.maxBought(availableCurrency)
        if (maxBought.lt(3)) {
            if (availableCurrency.gte(new Decimal("5e4"))) return new Decimal(3)
            if (availableCurrency.gte(new Decimal("5e3"))) return new Decimal(2)
            if (availableCurrency.gte(new Decimal("1e3"))) return new Decimal(1)
            return new Decimal(0)
        }
        return maxBought.floor().minus(buyableSets["bu"]).plus(1).max(0)
    },
    set: `bu`,
    subFromCurrency: false,
    currency: () => Currencies.boost,
    maxPurchases: Infinity,
   })

new SetRebuyable({
    name: "Nano Generators",
    cost: (x) => {
        return superExponentials.nanoSpeed.priceForPurchases(x)
        },
    set: `prt`,
    currency: () => Currencies.protons,
    toolTip: "Increases Nano Bot Generation Speed (x * 750^purchases)",
    maxPurchases: Infinity,
})

new SetRebuyable({
    name: "Nano Power",
    cost: (x) => {
        return superExponentials.nanoPower.priceForPurchases(x)
        },
    set: `prt2`,
    currency: () => Currencies.protons,
    toolTip: "Increases Nano Bot multiplier exponent (nanobots^2 -> nanobots^(2+purchases))",
    maxPurchases: 5,
})

let ProtonUpgradesData = {
    p1: {
        name: "Stronger Boost",
        cost: "2",
        info: "Boost multiplier is increased (log3(x)^2+1 -> log1.5((5^log3(x)^2+1)^1.5)"
    },
    p2: {
        name: "Enhanced Formula",
        cost: "2",
        info: "Boost gain formula is improved (10^(log10(carbon)/2)-30.338 -> 10.23^(log10(carbon)/1.78))"
    },
    p3: {
        name: "Faster Production Speed",
        cost: "5",
        info: "Production Speed is faster (buy mult x1.5 -> x1.5 + 0.65)"
    },
    p4: {
        name: "Enhanced Formula v2",
        cost: "1e3",
        info: "Boost gain formula is improved, based on Carbon Generators (x * 1.005^carbonGenerators)"
    },
    p5: {
        name: "Protonic Boost",
        cost: "2e3",
        info: "Gain more boost based on Protons(x * protons)"
    },
    p6: {
        name: "Ultimate Bond",
        cost: "5e3",
        info: "Increase the strength of Carbon Bonding per Carbon Generator (x * (0.01*carbonGenerators))"
    },
    p7: {
        name: "Carbon fueled Carbon",
        cost: "2e6",
        info: "Gain more Carbon based on your current Carbon (x * log2(Carbon+2)^4)"
    },
    p8: {
        name: "Nano Tech",
        cost: "1e6",
        info: "Unlock Nano Bots, which are generated on a base of +1/s they reset on Proton Crush, Nano Bots affect Carbon Generation (x * nanobots^2), they also make the Production Reduction from crushing decrease faster (x/1.5 -> x/(50*nanobots^0.1))"
    },
    p9: {
        name: "Speed Bonding",
        cost: "6e17",
        info: "Production Speed increases the strength of Carbon Bonding (x * log10(productionspeed + 10)), and improve Carbon Bonding Formula (bondingstrength^(carbongenerators^0.12) -> bondingstrength^(carbongenerators^0.2*(log10(carbongenerators)/1.2)))"
    },
    p10: {
        name: "Boosted Protons",
        cost: "1e50",
        info: "Proton gain is affected by Boost Multiplier (x * boostmult)"
    },
    p11: {
        name: "Boost Improvement",
        cost: "1e60",
        info: "Boost multiplier is increased (x + (2^x)^0.5)"
    },
    p12: {
        name: "Bonding Boost",
        cost: "1e80",
        info: "Boost Upgrade scales better ((x^2+1.01)^1.02 -> (2.02^x)+500), and Boost Multiplier applies to Nano Bot generation (x * boostmult^0.5)"
    },
    p13: {
        name: "Nano Speed",
        cost: "1e640",
        info: "Nano Bots increase Production Speed (buy mult x + superlog(nanobots))"
    },
    p14: {
        name: "Infinity Boost",
        cost: "1e500",
        info: "You gain 1% of the Boost you would gain every second (0 -> boostgained*0.01), and unlock Autobuyers for the Boost Upgrade"
    },
    p15: {
        name: "Productive NanoBots",
        cost: "e990",
        info: "Nano Bot generation is improved based on Production Speed, and theirselves (x * (log2(productionspeed)^5)^superlog(productionspeed^nanobots)), and unlock ???"
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
        data: ["PU"]
    })
}