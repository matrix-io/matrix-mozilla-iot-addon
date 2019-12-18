const { Property } = require("gateway-addon");

class MATRIXProperty extends Property {
  constructor(device, name, propertyDescription) {
    super(device, name, propertyDescription);
    this.setCachedValue(propertyDescription.value);
    this.device.notifyPropertyChanged(this);
  }

  /**
   * Set the value of the property.
   *
   * @param {*} value The new value to set
   * @returns a promise which resolves to the updated value.
   */
  setValue(value) {
    return new Promise((resolve, reject) => {
      super
        .setValue(value)
        .then(updatedValue => {
          resolve(updatedValue);
          this.device.notifyPropertyChanged(this);

          // Determine
          switch (this.name) {
            // LED Toggle
            case "on":
              if (updatedValue === true) matrix.led.set({ b: 1 });
              else matrix.led.set({});
              break;
            // Color Picker
            case "color":
              matrix.led.set(this.value);
              break;
            default:
              console.log(this.name + " MATRIX::EVENT not handled");
          }

          console.log("CARLOS LOOK AT THIS NAME!!!!");
          console.log(this.name);
          console.log("CARLOS LOOK AT THIS Value!!!!");
          console.log(this.value);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = MATRIXProperty;
