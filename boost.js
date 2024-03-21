function boostGained(carbon) {
    if (!carbon) carbon = totalcarbonthisreset.max(1)
    let softcap = new Decimal("1e2000")
    let gain = Decimal.pow(10, Decimal.log(carbon, 10).div(2)).minus(30.338).max(0)
    if (protonData.getIsUpgradeBought(2)) gain = Decimal.pow(10.23, Decimal.log(carbon, 10).div(1.78)).max(0)

    if (protonData.getIsUpgradeBought(4)) gain = gain.times(Decimal.pow(1.005, CGupgrade.set).max(1))
    if (protonData.getIsUpgradeBought(5)) gain = gain.times(Currencies.protons.value.max(1))

    if (gain.gte(softcap)) gain = gain.pow(0.5).times(softcap.pow(0.5))
    return gain
}

function boostMult(boost) {
    if (!boost) boost = Currencies.boost.value
    let mult = boost.log(3).pow(2).plus(1)
    if (protonData.getIsUpgradeBought(1)) mult = Decimal.pow(5, mult).pow(1.5).log(1.5)
    if (protonData.getIsUpgradeBought(11)) mult = mult.plus(Decimal.pow(2, mult.pow(0.5)).pow(0.05))
    return mult
}