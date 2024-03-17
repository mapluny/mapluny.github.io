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

    get isNegative() {
        if (this.config.negativeEffect==undefined) return false
        return this.config.negativeEffect
    }

    get effectClass() {
        // Grouping effects
        return this.config.effectClass
    }
}

class effectClass {
    // Only for Multiplier Tab stuff
    constructor(config) {
        this._config = config
    }

    get config() {
        return this._config
    }

    get name() {
        return this.config.name
    }

    get id() {
        return this.config.id
    }

    get displayName() {
        return this.config.dName
    }

    get allEffects() {
        let arr = []
        for (effectKey in effects) {
            let effect = effects[effectKey]
            if (!isFunction(effect) && effect.effectClass==this.name && !effect.isNegative) {
                // save negative effects for last
                arr.push(effect)
            }
        }
        for (effectKey in effects) {
            let effect = effects[effectKey]
            if (!isFunction(effect) && effect.effectClass==this.name && effect.isNegative) {
                // save negative effects for last
                arr.push(effect)
            }
        }
        return arr
    }

    get allEffectsMult() {
        return effects.getEffectValueForClass(this.name, true)
    }
    get allEffectsMultWithNegative() {
        return effects.getEffectValueForClass(this.name, false)
    }
    get allEffectsMultOnlyNegative() {
        return effects.getEffectValueForClass(this.name, false, true)
    }

}

effects = {
    effectClasses: {
        carbonGen: new effectClass({
            id: 0,
            name: "carbonGen",
            dName: "Carbon Generation"
        }),
        bondingStrength: new effectClass({
            id: 1,
            name: "carbonGenerators",
            dName: "Generator Bond Strength"
        }),
        bondingStrength: new effectClass({
            id: 2,
            name: "nanoBot",
            dName: "Nano Bot creation speed"
        }),
    },
    carbonGenerator: new effect({
        name: "carbon Generator",
        effectValue: () => {
        if (CGupgrade.set.eq(0)) return new Decimal(0)
        let cStrength = Decimal.pow(effects.getEffectValueForClass("carbonGenerators"), CGupgrade.set.pow(0.12).max(1)).max(1)
        if (protonData.getIsUpgradeBought(3)) cStrength = Decimal.pow(effects.getEffectValueForClass("carbonGenerators"), CGupgrade.set.pow(0.16).times(Decimal.log10(CGupgrade.set.max(4)).div(1.2)).max(1)).max(1)
        return Decimal.times(cStrength, CGupgrade.set)
        },
        effectClass: "carbonGen"
    }),
    pd: new effect({
        name: "Production Speed",
        effectValue: () => {
        let incrementPerUpgrade = new Decimal(1.5)
        if (protonData.getIsUpgradeBought(3)) incrementPerUpgrade = incrementPerUpgrade.plus(0.65)
        mult = new Decimal(incrementPerUpgrade).pow(PDupgrade.set)
        return mult
        },
        effectClass: "carbonGen"
    }),
    boost: new effect({
        name: "Boost",
        effectValue: () => boostMult(Currencies.boost.value),
        effectClass: "carbonGen"
    }),
    // for some reason doing effectValues that are less than 1 before any effects that are above 1 messes stuff up.
    productionreduction: new effect({
        name: "Production Reduction",
        effectValue: () => {
            return Decimal.div(1, productionreduction)
        },
        effectClass: "carbonGen",
        negativeEffect: true,
    }),
    boostUpg: new effect({
        name: "Boost Upgrade",
        effectValue: () => protonData.getIsUpgradeBought(12) ? Decimal.pow(2, Boostupgrade.set).pow(0.5).plus(500) : Boostupgrade.set.gte(5) ? Boostupgrade.set.pow(2).plus(1.1).pow(1.02).max(1) : Boostupgrade.set.lt(1) ? new Decimal(1) : Boostupgrade.set.log(1.5).pow(2.2).plus(1.1).max(1),
        effectClass: "carbonGenerators"
    }),
    proton6: new effect({
        name: "Proton Upgrade 6",
        effectValue: () => protonData.getIsUpgradeBought(6) ? new Decimal(2).times(Decimal.log10(CGupgrade.set.max(1))) : new Decimal(1),
        effectClass: "carbonGenerators"
    }),
    proton7: new effect({
        name: "Proton Upgrade 7",
        effectValue: () => protonData.getIsUpgradeBought(7) ? Decimal.log2(Currencies.carbon.value.plus(2)).pow(1.5) : new Decimal(1),
        effectClass: "carbonGen"
    }),
    proton9: new effect({
        name: "Proton Upgrade 9",
        effectValue: () => protonData.getIsUpgradeBought(9) ? Decimal.pow(effects.pd.effectValue, 0.1).max(1) : new Decimal(1),
        effectClass: "carbonGenerators"
    }),
    nanoMult: new effect({
        name: "Nano Bot",
        effectValue: () => Currencies.nanoBot.value.pow(2),
        effectClass: "carbonGen"
    }),
    proton10: new effect({
        name: "Proton Upgrade 10",
        effectValue: () => protonData.getIsUpgradeBought(9) ? Currencies.protons.value.max(1).log10().pow(2) : new Decimal(1),
        effectClass: "nanoBot"
    }),

    getEffectValueForClass(Effclass, noNeg, noPos) {
        let mult = new Decimal(1)
        if (!noPos) for (effectKey in effects) {
            let effect = effects[effectKey]
            if (!isFunction(effect) && effect.effectClass==Effclass && !effect.isNegative) {
                if (!isNaN(effect.effectValue)) mult = mult.times(effect.effectValue)
            }
        }
        if (noNeg) return mult

        for (effectKey in effects) {
            let effect = effects[effectKey]
            if (!isFunction(effect) && effect.effectClass==Effclass && effect.isNegative) {
                // save negative effects for last
                if (!isNaN(effect.effectValue)) mult = mult.times(effect.effectValue)
            }
        }
        return mult
    }
}