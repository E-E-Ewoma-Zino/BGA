const menu = require("./menu.routes");
const menuGroup = require("./menuGroup.routes");
const widget = require("./widget.routes");

module.exports = (app) => (menu(app), menuGroup(app), widget(app));