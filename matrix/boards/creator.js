module.exports = {
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
          value: false
        },
        temperature: {
          "@type": "TemperatureProperty",
          label: "Temperature",
          name: "Temperature",
          type: "number",
          value: false
        }
      }
    }
  },

  property: {
    setValue: function() {}
  }
};
