const matrix = require("@matrix-io/matrix-lite");

module.exports = {
  properties: {
    // - IMU sensor
    yaw: {
      "@type": "YawProperty",
      label: "Yaw",
      name: "Yaw",
      type: "number",
      value: 0
    },
    pitch: {
      "@type": "PitchProperty",
      label: "Pitch",
      name: "Pitch",
      type: "number",
      value: 0
    },
    roll: {
      "@type": "RollProperty",
      label: "Roll",
      name: "Roll",
      type: "number",
      value: 0
    },

    // - Pressure sensor
    altitude: {
      "@type": "AltitudeProperty",
      label: "Altitude",
      name: "Altitude",
      type: "number",
      value: 0
    },

    pressure: {
      "@type": "PressureProperty",
      label: "Pressure",
      name: "Pressure",
      type: "number",
      value: 0
    },

    // - UV sensor
    uv: {
      "@type": "UvProperty",
      label: "UV",
      name: "UV",
      type: "number",
      value: 0
    },

    // - Humidity sensor
    humidity: {
      "@type": "HumidityProperty",
      label: "Humidity",
      name: "Humidity",
      type: "number",
      value: 0
    },
    temperature: {
      "@type": "TemperatureProperty",
      label: "Temperature",
      name: "Temperature",
      type: "number",
      value: 0
    }
  }
};
