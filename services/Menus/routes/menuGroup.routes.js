// Menu Group routes
const { validate_remove_menu_group, validate_get_menu_group, validate_update_menu_group, validate_get_all_menu_group, validate_add_menu_group } = require("../middleware/menuGroup.middleware");
const { isAuthorize, isAdministrator } = require("../../../middleware/authorization.middleware");
const menu_group = require("../controllers/menuGroup.controller");

module.exports = (app) => {
	// @desc	add in the menu_group information
	app.post("/group/add", isAuthorize, isAdministrator, validate_add_menu_group, menu_group.add_menu_group);
	
	// @desc	get a menu_group's current information by id
	app.get("/group/get/all/:id", isAuthorize, isAdministrator, validate_get_all_menu_group, menu_group.get_all_menu_group);

	// @desc	get a menu_group's current information by id
	app.get("/group/get/:id", isAuthorize, isAdministrator, validate_get_menu_group, menu_group.get_menu_group)

	// @desc	update a menu_group's current imformation
	app.patch("/group/update/:id", isAuthorize, isAdministrator, validate_update_menu_group, menu_group.update_menu_group);

	// @desc	delete a menu_group
	app.delete("/group/remove/:id", isAuthorize, isAdministrator, validate_remove_menu_group, menu_group.remove_menu_group);
}