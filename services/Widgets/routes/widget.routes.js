// Widget routes
const { validate_remove_widget, validate_get_widget, validate_update_widget, validate_get_all_widget, validate_add_widget } = require("../middleware/widget.middleware");
const { isAuthorize, isAdministrator } = require("../../../middleware/authorization.middleware");
const widget = require("../controllers/widget.controller");

module.exports = (app) => {
	// @desc	add in the widget information
	app.post("/widget/add", isAuthorize, isAdministrator, validate_add_widget, widget.add_widget);
	
	// @desc	get a widget's current information by id
	app.get("/widget/get/all/:id", isAuthorize, validate_get_all_widget, widget.get_all_widget);

	// @desc	get a widget's current information by id
	app.get("/widget/get/:id", isAuthorize, validate_get_widget, widget.get_widget);

	// @desc	update a widget's current imformation
	app.patch("/widget/update/:id", isAuthorize, isAdministrator, validate_update_widget, widget.update_widget);

	// @desc	delete a widget
	app.delete("/widget/remove/:id", isAuthorize, isAdministrator, validate_remove_widget, widget.remove_widget);
}