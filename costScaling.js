class superExponential {
    constructor(config) {
        this._config = config
    }

    get config() {
        return this._config
    }

    get baseCost() {
        return this.config.b
    }

    get incrementCost() {
        return this.config.t
    }

    priceForPurchases(n) {
        let nDC = new Decimal(n)
        return this.baseCost.times(this.incrementCost.pow(nDC).pow(nDC))
    }

    maxBought(x) {
        let xDC = new Decimal(x)
        let logBase = Decimal.ln(this.incrementCost)
        let firstPart = Decimal.sqrt(Decimal.ln(xDC.div(this.baseCost)).div(logBase))
        return firstPart
    }
    
}