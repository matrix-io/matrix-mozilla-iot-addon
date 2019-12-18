# MATRIX-adapter

This is a super basic and simple example of an adapter add-on for the WebThings
Gateway.

For more information, you may want to look at these:

- https://hacks.mozilla.org/2018/02/creating-an-add-on-for-the-project-things-gateway/
- https://hacks.mozilla.org/2018/02/making-a-clap-sensing-web-thing/

# Install

This requires the following perquisites:

- [Mozilla IoT](https://iot.mozilla.org/docs/gateway-getting-started-guide.html)
- [MATRIX Lite JS](https://matrix-io.github.io/matrix-documentation/matrix-lite/getting-started/javascript/)

```bash
cd ~/.mozilla-iot/addons/
git clone https://github.com/matrix-io/matrix-mozilla-iot-addon matrix-adapter
cd ./matrix-adapter
npm install
```

# Development

Changes are loaded by restarting the `mozilla-iot-gateway` service or by manually enabling/disabling the addon.

```bash
npm run load
```
