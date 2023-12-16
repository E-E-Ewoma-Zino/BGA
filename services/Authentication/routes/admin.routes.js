// Admin CRUD routes
const { validate_get_admin, validate_add_admin, validate_update_admin, validate_remove_admin, validate_admin_login } = require("../middleware/admin.middleware");
const admin = require("../controllers/admin.controller");
const { isAuthorize, isSuperAdmin } = require("../../../middleware/authorization.middleware");

module.exports = (app) => {
	// @desc	Login in as a admin
	app.post("/admin/auth", validate_admin_login, admin.login_admin);

	// @desc	add new admin
	app.post("/admin/add", isAuthorize, isSuperAdmin, validate_add_admin, admin.add_admin);

	// @desc	get a admin's current information by id
	app.get("/admin/get/all", isAuthorize, isSuperAdmin, admin.get_all_admin);

	// @desc	get a admin's current information by id
	app.get("/admin/get/:id", isAuthorize, isSuperAdmin, validate_get_admin, admin.get_admin);

	// @desc	update a admin's current imformation
	app.patch("/admin/update/:id", isAuthorize, isSuperAdmin, validate_update_admin, admin.update_admin);

	// @desc	delete a admin
	app.delete("/admin/remove/:id", isAuthorize, isSuperAdmin, validate_remove_admin, admin.remove_admin);

	// @desc	logout
	app.get("/admin/auth/logout", isAuthorize, admin.logout);
}