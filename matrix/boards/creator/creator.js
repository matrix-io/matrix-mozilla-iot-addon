const matrix = require("@matrix-io/matrix-lite");
const sensors = require("./sensors");

sensorInterval = undefined;

module.exports = {
  init: function(adapter) {
    setInterval(() => {
      // store latest sensor data
      let updatedSensors = {
        ...matrix.imu.read(),
        ...matrix.uv.read(),
        ...matrix.pressure.read(),
        ...matrix.humidity.read()
      };

      // format sensor values

      // update gui sensor values
      for (sensor in sensors.properties) {
        let prop = adapter.devices["matrix"].properties.get(sensor);
        prop.setCachedValue(updatedSensors[sensor]); // set internal value
        prop.device.notifyPropertyChanged(prop); // tell GUI to show new value
      }
    }, 1000);
  },

  stop: function() {
    clearInterval(sensorInterval);
  },

  // Device properties
  adapter: {
    description: {
      name: "MATRIX Creator",
      // "@type": ["",""],
      description: "MATRIX Creator Development Board",

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
          value: "#000"
        },

        ...sensors.properties
      }
    }
  }
};

/*
setCachedValue = ({ '@type': 'OnOffProperty',
                    label: 'On/Off',
                    name: 'on',
                    type: 'boolean',
                    value: false 
                  }.value);

this = 
 MATRIXProperty {
   device: 
    MATRIXDevice {
      adapter: 
       MATRIXAdapter {
         manager: [Object],
         id: 'MATRIXAdapter',
         packageName: 'matrix-adapter',
         name: 'MATRIXAdapter',
         devices: {},
         actions: {},
         ready: true,
         gatewayVersion: '0.10.0',
         userProfile: [Object] },
      id: 'matrix',
      type: undefined,
      '@context': 'https://iot.mozilla.org/schemas',
      '@type': undefined,
      title: '',
      description: 'MATRIX Creator Development Board',
      properties: Map {},
      actions: Map {},
      events: Map {},
      links: [],
      baseHref: null,
      pinRequired: false,
      pinPattern: null,
      credentialsRequired: false,
      name: 'MATRIX Creator' },
   name: 'on',
   visible: true,
   fireAndForget: false,
   title: 'On/Off',
   type: 'boolean',
   '@type': 'OnOffProperty',
   value: false }
*/
