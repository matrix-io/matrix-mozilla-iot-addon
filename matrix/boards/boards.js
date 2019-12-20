// Expose properties for currently attached board
const info = require("@matrix-io/matrix-lite").info;
const creator = require("./creator");
const voice = require("./voice");

module.exports = info.deviceType === "MATRIX Creator" ? creator : voice;
