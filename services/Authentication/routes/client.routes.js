// Auth authentication routes
const { validate_register_client, validate_client_login, validate_remove_client, validate_get_client, validate_update_client, validate_get_all_client } = require("../middleware/client.middleware");
const client = require("../controllers/client.controller");
const { isAuthorize, isSuperAdmin, isAdministrator } = require("../../../middleware/authorization.middleware");

module.exports = (app) => {
	// @desc	login a client
	app.post("/auth", validate_client_login, client.login_client);

	// @desc	add in the client information
	app.post("/client/register", isAuthorize, isSuperAdmin, validate_register_client, client.register_client);
	
	// @desc	get a client's current information by id
	app.get("/client/get/all", isAuthorize, isAdministrator, validate_get_all_client, client.get_all_client);

	// @desc	get a client's current information by id
	app.get("/client/get/:id", isAuthorize, isAdministrator, validate_get_client, client.get_client)

	// @desc	update a client's current imformation
	app.patch("/client/update/:id", isAuthorize, isAdministrator, validate_update_client, client.update_client);

	// @desc	delete a client
	app.delete("/client/remove/:id", isAuthorize, isSuperAdmin, validate_remove_client, client.remove_client);

	// @desc	logout
	app.get("/auth/logout", isAuthorize, client.logout);
}