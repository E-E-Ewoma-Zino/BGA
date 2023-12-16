// export the routes to the main app

const client = require("./client.routes");
const admin = require("./admin.routes");

module.exports = { client, admin };