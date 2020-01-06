const { Adapter, Device } = require("gateway-addon");
const matrixProp = require("./properties");
const matrixBoard = require("./boards/boards");

class MATRIXDevice extends Device {
  constructor(adapter, id, deviceDescription) {
    super(adapter, id);
    this.name = deviceDescription.name;
    this.type = deviceDescription.type;
    this["@type"] = deviceDescription["@type"];
    this.description = deviceDescription.description;

    // Initialize each device's property
    for (const propertyName in deviceDescription.properties) {
      const propertyDescription = deviceDescription.properties[propertyName];
      const property = new matrixProp(this, propertyName, propertyDescription);
      this.properties.set(propertyName, property);
    }
  }
}

class MATRIXAdapter extends Adapter {
  constructor(addonManager, manifest) {
    super(addonManager, "MATRIXAdapter", manifest.name);
    addonManager.addAdapter(this);

    // Add MATRIX device if none currently exist
    if (!this.devices["matrix"])
      this.handleDeviceAdded(
        new MATRIXDevice(this, "matrix", matrixBoard.adapter.description)
      );

    matrixBoard.init(this);
  }

  //////////////////////////////////////////////
  //
  // Device paring & connection handlers
  //
  /////////////////////////////////////////////
  /**
   * Process to add a new device to the adapter.
   *
   * The important part is to call: `this.handleDeviceAdded(device)`
   *
   * @param {String} deviceId ID of the device to add.
   * @param {String} deviceDescription Description of the device to add.
   * @return {Promise} which resolves to the device added.
   */
  addDevice(deviceId, deviceDescription) {
    return new Promise((resolve, reject) => {
      if (deviceId in this.devices) {
        reject(`Device: ${deviceId} already exists.`);
      } else {
        const device = new MATRIXDevice(this, deviceId, deviceDescription);
        this.handleDeviceAdded(device);
        resolve(device);
      }
    });
  }

  /**
   * Process ro remove a device from the adapter.
   *
   * The important part is to call: `this.handleDeviceRemoved(device)`
   *
   * @param {String} deviceId ID of the device to remove.
   * @return {Promise} which resolves to the device removed.
   */
  removeDevice(deviceId) {
    return new Promise((resolve, reject) => {
      const device = this.devices[deviceId];
      if (device) {
        this.handleDeviceRemoved(device);
        matrixBoard.stop(); // gracefully stop matrix processes
        resolve(device);
      } else {
        reject(`Device: ${deviceId} not found.`);
      }
    });
  }

  /**
   * Start the pairing/discovery process.
   *
   * @param {Number} timeoutSeconds Number of seconds to run before timeout
   */
  startPairing(_timeoutSeconds) {
    console.log("MATRIX-Adapter:", this.name, "id", this.id, "pairing started");
  }

  /**
   * Cancel the pairing/discovery process.
   */
  cancelPairing() {
    console.log(this.name, "id", this.id, "pairing cancelled");
  }

  /**
   * Unpair the provided the device from the adapter.
   *
   * @param {Object} device Device to unpair with
   */
  removeThing(device) {
    console.log(
      "MATRIX-Adapter:",
      this.name,
      "id",
      this.id,
      "removeThing(",
      device.id,
      ") started"
    );

    this.removeDevice(device.id)
      .then(() => {
        console.log("MATRIX-Adapter: device:", device.id, "was unpaired.");
      })
      .catch(err => {
        console.error("MATRIX-Adapter: unpairing", device.id, "failed");
        console.error(err);
      });
  }

  /**
   * Cancel unpairing process.
   *
   * @param {Object} device Device that is currently being paired
   */
  cancelRemoveThing(device) {
    console.log(
      "Adapter:",
      this.name,
      "id",
      this.id,
      "cancelRemoveThing(",
      device.id,
      ")"
    );
  }
} //

module.exports = MATRIXAdapter;
