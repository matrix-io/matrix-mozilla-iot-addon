const { Adapter, Device } = require("gateway-addon");
const matrix = require("@matrix-io/matrix-lite");
const matrixProp = require("./properties");
const boards = require("./boards/boards");

let APIHandler;
try {
  APIHandler = require("../api-handler");
} catch (e) {
  console.log("API Handler unavailable: ${e}");
}

class ExampleDevice extends Device {
  constructor(adapter, id, deviceDescription) {
    super(adapter, id);
    this.name = deviceDescription.name;
    this.type = deviceDescription.type;
    this["@type"] = deviceDescription["@type"];
    this.description = deviceDescription.description;
    for (const propertyName in deviceDescription.properties) {
      const propertyDescription = deviceDescription.properties[propertyName];
      const property = new matrixProp(this, propertyName, propertyDescription);
      this.properties.set(propertyName, property);
    }

    // description link remove
    // if (APIHandler) {
    //   this.links.push({
    //     rel: "alternate",
    //     mediaType: "text/html",
    //     // eslint-disable-next-line max-len
    //     href: `/extensions/example-adapter?thingId=${encodeURIComponent(
    //       this.id
    //     )}`
    //   });
    // }
  }
}

class ExampleAdapter extends Adapter {
  constructor(addonManager, manifest) {
    super(addonManager, "ExampleAdapter", manifest.name);
    addonManager.addAdapter(this);

    if (!this.devices["matrix"]) {
      const device = new ExampleDevice(this, "matrix", {
        name: "MATRIX",
        // "@type": ["",""],
        description: "MATRIX Development Board",
        properties: {
          on: {
            "@type": "OnOffProperty",
            label: "On/Off",
            name: "on",
            type: "boolean",
            value: false
          },
          color: {
            "@type": "ColorProperty",
            label: "Color",
            name: "Color",
            type: "string",
            value: false
          }
        }
      });

      this.handleDeviceAdded(device);
    }

    if (APIHandler) {
      this.apiHandler = new APIHandler(addonManager, this);
    }
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
        const device = new ExampleDevice(this, deviceId, deviceDescription);
        this.handleDeviceAdded(device);
        resolve(device);
      }
    });
  }

  /**
   * Example process ro remove a device from the adapter.
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
}

module.exports = ExampleAdapter;
