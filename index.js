const MatrixAdapter = require("./matrix/adapter");

module.exports = (addonManager, manifest) => {
  new MatrixAdapter(addonManager, manifest);
};
