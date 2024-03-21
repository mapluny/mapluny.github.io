class Autobuyer {
    constructor(config) {
        this._config = config;
        Autobuyer.instances.push(this);
        if (localStorage.save) {
            if (!JSON.parse(localStorage.save).autobuyers[this.config.set]) {
                autobuyers[this.config.set] = false;
            }
            else {
                autobuyers[this.config.set] = JSON.parse(localStorage.save).autobuyers[this.config.set];
            }
        }
        else {
            autobuyers[this.config.set] = false;
        }
    }

    static instances = [];

    static getInstanceBySet(name) {
        return Autobuyer.instances.find(instance => instance.config.set === name);
    }

    get config() {
        return this._config;
    }

    get setRebuyable() {
        return SetRebuyable.getInstanceBySet(this.config.set);
    }

    get unlockRequirement() {
        return this.config.unlockRequirement();
    }

    get isEnabled() {
        return autobuyers[this.config.set];
    }

    set isEnabled(value) {
        autobuyers[this.config.set] = value;
    }

    tick() {
        if (this.isEnabled && this.setRebuyable.canBuy && this.unlockRequirement) {
            this.setRebuyable.purchase(true);
        }
    }
}

let autobuyers = {};

new Autobuyer({
    set:"cg",
    unlockRequirement: () => progression > 1
})

new Autobuyer({
    set:"pd",
    unlockRequirement: () => progression > 1
})

new Autobuyer({
    set:"bu",
    unlockRequirement: () => protonData.getIsUpgradeBought(14)
})