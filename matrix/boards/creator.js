const matrix = require("@matrix-io/matrix-lite");

let APIHandler;
try {
  APIHandler = require("../../api-handler");
} catch (e) {
  console.log("API Handler unavailable: ${e}");
}
