function protonsGained(carbon) {

    let gain = Decimal.round(carbon.div("5e7").pow(0.25)).min(plimit)
    if (protonData.getIsUpgradeBought(10)) gain = gain.mul(boostMult())
    return gain;
}

function pcrush(gain) {
    if (gain === undefined) gain = protonsGained(Currencies.carbon.value)
    if (gain.gte(1)){
        reductiongain = getPRforGain(gain)
        productionreduction = Decimal.max(productionreduction, reductiongain)
        Currencies.carbon.setValue(new Decimal(10));
        Currencies.nanoBot.setValue(new Decimal(1));
        protons = protons.plus(gain);
        }
}

function getPRforGain(gain) {
    // Be nicer because the wait time is insanely increased for high numbers
    if (gain.gte("1e5")) return Decimal.pow("1e3", gain.log(12)).max('1.69e316')
    return Decimal.pow10(gain.pow(0.5)).div(gain.pow(2)).max(1)
}

function getNextPR(diff, curr) {
    let divPerSecond = protonData.productionReduction.divPerSecond()

    // idk what actually causes it but sometimes during offline progress while PR is being reduced everything is NaN so hopefully this fixes it.

    if (diff == 0) return curr

    let loss = Decimal.pow(divPerSecond, diff / 100).min(curr)
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
        let upgrades = SetRebuyable.instances.filter(upg => upg.otherData.find(data => data=="PU"))
        return upgrades
    },

    resetUpgrades() {
        for (upgKey in this.allUpgrades()) {
            upgKey = JSON.parse(upgKey)+1
            let upg = this.getUpgrade(upgKey);
            upg.set = new Decimal(0);
        }
    },
    productionReduction: {
        divPerSecond() {
            return Currencies.nanoBot.value.gt(1) ? Decimal.times(50, Currencies.nanoBot.value.max(5).pow(0.1)) : Decimal.times(1.5, Currencies.nanoBot.value.max(5).pow(0.1))
        }
    }
}