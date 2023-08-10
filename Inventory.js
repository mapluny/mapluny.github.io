// Define a constructor function for the object
function MyObject(type, effects, level) {
    this.enabled = false; // Object is initially enabled
		this.type = type;
		this.effects = effects;
		this.level = level;
        MyObject.instances.push(this); // Add the instance to the instances array
}

MyObject.instances = [];
MyObject.maxEnabledCount = 4;

// Add methods to the prototype of the constructor
MyObject.prototype.disable = function() {
    this.enabled = false;
    console.log(`${this.name} has been disabled.`);
};

MyObject.prototype.enable = function() {
    const enabledInstances = MyObject.getEnabledInstances();
    if (enabledInstances.length < MyObject.maxEnabledCount) {
        this.enabled = true;
        console.log(`${this.type} has been reenabled.`);
    } else {
        console.log(`Cannot enable ${this.type}. Maximum enabled count reached.`);
    }
};



MyObject.getEnabledInstances = function() {
    return MyObject.instances.filter(instance => instance.enabled);
};

MyObject.getEnabledCount = function() {
    return MyObject.getEnabledInstances().length;
};