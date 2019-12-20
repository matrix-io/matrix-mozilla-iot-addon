const { Property } = require("gateway-addon");
const matrix = require("@matrix-io/matrix-lite");
const matrixBoard = require("./boards/boards");

class MATRIXProperty extends Property {
  constructor(device, name, propertyDescription) {
    super(device, name, propertyDescription);
    this.setCachedValue(propertyDescription.value);

    console.log("DEBUGGG: propertyDescription");
    console.log(propertyDescription);

    console.log("DEBUGGG: this");
    console.log(this);

    this.device.notifyPropertyChanged(this);
  }

  /**
   * Set the value of the property.
   *
   * @param {*} value The new value to set
   * @returns a promise which resolves to the updated value.
   */
  setValue(value) {
    console.log("object::::");
    console.log(this);

    return new Promise((resolve, reject) => {
      super
        .setValue(value)
        .then(updatedValue => {
          resolve(updatedValue);
          this.device.notifyPropertyChanged(this);

          // Determine changed property
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

          // console.log(this);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = MATRIXProperty;
