module.exports = {
  // device properties
  adapter: {
    description: {
      name: "MATRIX Voice",
      // "@type": ["",""],
      description: "MATRIX Voice Development Board",
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
    }
  }
};
