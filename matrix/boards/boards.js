const info = require("@matrix-io/matrix-lite").info;
const creator = require("./creator/creator");
const voice = require("./voice/voice");

// Expose module for whichever board is currently attached
module.exports = info.deviceType === "MATRIX Creator" ? creator : voice;
