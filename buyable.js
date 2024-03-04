class SetRebuyable {
    constructor(config) {
        this._config = config
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
        return this.currency.value.gte(this.cost)
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

    purchase() {
        if (!this.canBuy) return
        this.currency.sub(this.cost)
        if (isDecimal(this.set)) this.set = (this.set.plus(1))
        if (!isDecimal(this.set)) this.set = (this.set + 1)
    }
}

buyableSets = {
    cg: new Decimal(0),
    pd: new Decimal(0),
    bu: new Decimal(0),
}

CGupgrade = new SetRebuyable({
 name: "Carbon Generator",
 cost: (x) => new Decimal(10).times(new Decimal(1.15).pow(x)),
 set: `cg`,
 currency: () => Currencies.carbon,
})

PDupgrade = new SetRebuyable({
    name: "Production Speed",
    cost: (x) => new Decimal(100).times(new Decimal(10).pow(x)),
    set: `pd`,
    currency: () => Currencies.carbon,
   })

Boostupgrade = new SetRebuyable({
    name: "Carbon Generator Strength",
    cost: (x) => new Decimal(100).times(new Decimal(5).pow(x)),
    set: `bu`,
    currency: () => Currencies.boost,
   })