module.exports = {
  //     "@type": "OnOffProperty",
  //     label: "On/Off",
  //     name: "on",
  //     type: "boolean",
  //     value: false

  on: () => {
    return {
      name: "on",
      value: false,
      metadata: {
        title: "On/Off",
        type: "boolean",
        "@type": "OnOffProperty"
      }
    };
  },
  color: () => {
    return {
      name: "color",
      value: "#ffffff",
      metadata: {
        title: "Color",
        type: "string",
        "@type": "ColorProperty"
      }
    };
  }
};
