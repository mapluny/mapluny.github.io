// Idea definitely not stolen from Antimatter Dimensions

class Currency {
    constructor(config) {
        this._config = config
    }

    get config() {
        return this._config
    }

    get name() {
        return this.config.name
    }

    get value() {
        return this.config.value()
    }

    setValue(val) {
        this.config.setValue(val)
    }
}

class DecimalCurrency extends Currency {
    superConstructor(config) {
        this._config = config
    }

    add(val) {
        this.setValue(this.value.plus(val))
    }

    mul(val) {
        this.setValue(this.value.mul(val))
    }

    pow(val) {
        this.setValue(this.value.pow(val))
    }

    div(val) {
        this.setValue(this.value.div(val))
    }

    sub(val) {
        this.setValue(this.value.sub(val))
    }
}

class DecimalResource extends DecimalCurrency {
    superConstructor(config) {
        this._config = config
    }

    get perSecond() {
        return this.config.perSecond()
    }

    tick(diff) {
        this.add(this.perSecond.div(100 / diff))
    }
}

Currencies = {
    carbon: new DecimalResource({
        name: "Carbon",
        value: () => carbon,
        setValue: (x) => {
            carbon = x
            highestcarbonthisreset = Decimal.max(highestcarbonthisreset, x)
        },
        perSecond: () => effects.getEffectValueForClass("carbonGen")
    }),
    boost: new DecimalResource({
        name: "Boost",
        value: () => boost,
        setValue: (x) => boost = x,
        perSecond: () => new Decimal(0)
    })
}