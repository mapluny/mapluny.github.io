function boostGained(carbon) {
    let gain = Decimal.pow(10, Decimal.log(carbon, 10).div(2)).minus(30.338).max(0)
    if (protonData.getIsUpgradeBought(2)) gain = Decimal.pow(10.23, Decimal.log(carbon, 10).div(1.78)).max(0)

    if (protonData.getIsUpgradeBought(4)) gain = gain.times(CGupgrade.set.pow(1.44).max(1))
    if (protonData.getIsUpgradeBought(5)) gain = gain.times(Currencies.protons.value.max(1))
    return gain
}

function boostMult(boost) {
    let mult = boost.log(3).pow(2).plus(1)
    if (protonData.getIsUpgradeBought(1)) mult = Decimal.pow(5, mult).pow(1.5).log(1.5)
    if (protonData.getIsUpgradeBought(11)) mult = mult.times(mult.pow(0.65))
    return mult
}