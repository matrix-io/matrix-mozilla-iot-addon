const { Adapter, Device, Property } = require("gateway-addon");
const props = require("./properties");
const matrix = require("@matrix-io/matrix-lite");
matrix.led.set("black");

let ExampleAPIHandler = null;
try {
  ExampleAPIHandler = require("../example-api-handler");
} catch (e) {
  console.log(`API Handler unavailable: ${e}`);
}

class ExampleProperty extends Property {
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

class ExampleDevice extends Device {
  constructor(adapter, id, deviceDescription) {
    super(adapter, id);
    this.name = deviceDescription.name;
    this.type = deviceDescription.type;
    this["@type"] = deviceDescription["@type"];
    this.description = deviceDescription.description;
    for (const propertyName in deviceDescription.properties) {
      const propertyDescription = deviceDescription.properties[propertyName];
      const property = new ExampleProperty(
        this,
        propertyName,
        propertyDescription
      );
      this.properties.set(propertyName, property);
    }

    // Remove description link
    // if (ExampleAPIHandler) {
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

    if (!this.devices["matrix-board"]) {
      const device = new ExampleDevice(this, "matrix-board", {
        name: "MATRIX Board",
        "@type": ["MATRIX Creator", "MATRIX Voice"],
        description: "MATRIX Development Board",
        // properties: [props.on(), props.color()]
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

    if (ExampleAPIHandler) {
      this.apiHandler = new ExampleAPIHandler(addonManager, this);
    }
  }

  //////////////////////////////////////////////
  //
  // Device paring & connection handlers
  //
  /////////////////////////////////////////////
  /**
   * Example process to add a new device to the adapter.
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
    console.log(
      "MATRIX-Adapter:",
      this.name,
      "id",
      this.id,
      "pairing cancelled"
    );
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
      "ExampleAdapter:",
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