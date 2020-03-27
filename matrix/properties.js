const { Property } = require("gateway-addon");
const matrix = require("@matrix-io/matrix-lite");
const matrixBoard = require("./boards/boards");

let lastLedColor = { r: 0, g: 0, b: 100, w: 0 };

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

          // Determine changed property
          switch (this.name) {
            // LED Toggle
            case "on":
              if (updatedValue === true) matrix.led.set(lastLedColor);
              else matrix.led.set({});
              break;
            // Color Picker
            case "color":
              lastLedColor = this.value;
              // matrix.led.set(this.value);
              break;
            default:
              console.log(this.name + " MATRIX::EVENT not handled");
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = MATRIXProperty;
