// Menu routes
const { validate_remove_menu, validate_get_menu, validate_update_menu, validate_get_all_menu, validate_add_menu } = require("../middleware/menu.middleware");
const { isAuthorize, isAdministrator } = require("../../../middleware/authorization.middleware");
const menu = require("../controllers/menu.controller");

module.exports = (app) => {
	// @desc	add in the menu information
	app.get("/menu/client/:id", isAuthorize, validate_get_all_menu, menu.client_menu);

	// @desc	add in the menu information
	app.post("/menu/add", isAuthorize, isAdministrator, validate_add_menu, menu.add_menu);
	
	// @desc	get all menu's current information by id
	app.get("/menu/get/all/:id", isAuthorize, isAdministrator, validate_get_all_menu, menu.get_all_menu);

	// @desc	get a menu's current information by id
	app.get("/menu/get/:id", isAuthorize, isAdministrator, validate_get_menu, menu.get_menu)

	// @desc	update a menu's current imformation
	app.patch("/menu/update/:id", isAuthorize, isAdministrator, validate_update_menu, menu.update_menu);

	// @desc	delete a menu
	app.delete("/menu/remove/:id", isAuthorize, isAdministrator, validate_remove_menu, menu.remove_menu);
}