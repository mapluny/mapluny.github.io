function protonsGained(carbon) {
 return Decimal.round(carbon.div("5e7").pow(0.25));
}

function pcrush(gain) {
    if (gain === undefined) gain = protonsGained(Currencies.carbon.value)
    if (gain.gte(1) && Currencies.boost.value.gte("1e5")){
        reductiongain = getPRforGain(gain)
        productionreduction = Decimal.max(productionreduction, reductiongain)
        Currencies.carbon.setValue(new Decimal(10));
        Currencies.nanoBot.setValue(new Decimal(0));
        protons = protons.plus(gain);
        }
}

function getPRforGain(gain) {
    // Be nicer because the wait time is insanely increased for high numbers
    if (gain.gte("1e6")) return Decimal.pow("1e150", gain.log(12)).max("1e1000")
    return Decimal.pow10(gain.pow(0.5))
}

function getNextPR(diff, curr) {
    let divPerSecond = protonData.productionReduction.divPerSecond()
    let loss = Decimal.pow(divPerSecond, diff / 100)
    return curr.div(loss)
}

function getTimeToFinishPR(curr) {
    let divPerSecond = protonData.productionReduction.divPerSecond();
    let time = new Decimal(1000).times(curr.log(divPerSecond));
    return time;
}


let protonData = {
    getUpgrade(id) {
        return SetRebuyable.instances.find(upg => upg.config.set=="p" + id)
    },
    getIsUpgradeBought(id) {
        if (!this.getUpgrade(id)) throw Error("Upgrade with " + id + " id does not exist")
        return this.getUpgrade(id).set.gte(1)
    },
    allUpgrades() {
        let i = 1
        let upgrades = []
        while (SetRebuyable.instances.find(upg => upg.config.set==="p" + i) !== undefined) {
            upgrades.push(SetRebuyable.instances[i])
            i++
        }
        return upgrades
    },
    productionReduction: {
        divPerSecond() {
            return Decimal.times(1.5, Currencies.nanoBot.value.max(5).log(2).pow(2).times(10))
        }
    }
}