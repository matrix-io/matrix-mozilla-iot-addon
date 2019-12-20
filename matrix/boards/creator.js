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
          value: false // not sure if this prop works
        },
        color: {
          "@type": "ColorProperty",
          label: "Color",
          name: "Color",
          type: "string",
          value: "#000" // not sure if this prop works
        },
        temperature: {
          "@type": "TemperatureProperty",
          label: "Temperature",
          name: "Temperature",
          type: "number",
          value: 0 // not sure if this prop works
        }
      }
    }
  },

  property: {
    setValue: function() {}
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
