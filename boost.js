function boostGained(carbon) {
    return Decimal.pow(10, Decimal.log(carbon, 10).div(2)).minus(30.338).max(0)
}