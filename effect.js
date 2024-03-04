class effect {
    constructor(config) {
        this._config = config
    }

    get config() {
        return this._config
    }

    get name() {
        return this.config.name
    }

    get effectValue() {
        return this.config.effectValue()
    }

    get effectClass() {
        // Grouping effects
        return this.config.effectClass
    }
}

effects = {
    carbonGenerator: new effect({
        name: "carbon Generators",
        effectValue: () => CGupgrade.set,
        effectClass: "carbonGen"
    }),
    pd: new effect({
        name: "Production Speed",
        effectValue: () => new Decimal(1.5).pow(PDupgrade.set),
        effectClass: "carbonGen"
    }),
    boost: new effect({
        name: "Production Speed",
        effectValue: () => Currencies.boost.value.pow(2.5),
        effectClass: "carbonGen"
    }),

    getEffectValueForClass(Effclass) {
        mult = new Decimal(1)
        for (effectKey in effects) {
            effect = effects[effectKey]
            if (!isFunction(effect) && effect.effectClass==Effclass) {
                if (!effect.effectValue.isNan()) mult = mult.times(effect.effectValue)
            }
        }
        return mult
    }
}