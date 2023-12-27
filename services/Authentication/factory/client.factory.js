// handle all complex route works here
const passport = require("passport");
const clientDao = require("../dao/client.dao");
const ERROR = require("../../../utilities/error.utilities");

// Respect this guy. He controlls all
const SUPER_ADMIN = "SUPER_ADMIN";

// Register a new client
exports.register_client_factory = async (data) => {
	try {
		const { password, ...others } = data;

		const result = await clientDao.register(others, password);

		if (!result) {
			throw {
				status: 409,
				message: "Failed to register new client",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully registered client",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Update a new client
exports.update_client_factory = async (data) => {
	try {
		let { _id, role, ...others } = data;

		// let query = { _id, admin };
		// if (role === SUPER_ADMIN) delete query.admin;

		const result = await clientDao.update({ _id }, { $set: { ...others } });

		if (!result) {
			throw {
				status: 404,
				message: "Failed to update client",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully updated client",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new client
exports.get_client_factory = async (data) => {
	try {
		let { role, ...others } = data;

		if (role === SUPER_ADMIN) delete others.admin;

		const result = await clientDao.get(others);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get client data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully found client",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}


// Get all new client
exports.get_all_client_factory = async (data) => {
	try {
		let { role, ...others } = data;

		if (role === SUPER_ADMIN) delete others.admin;
		const result = await clientDao.getAll(others);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get client data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: `Sucessfully found ${result.length} client`,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Remove a client
exports.remove_client_factory = async (data) => {
	try {
		let { role, ...others } = data;

		if (role === SUPER_ADMIN) delete others.admin;

		const result = await clientDao.remove(others);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to remove client",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully removed client",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// This function helps with the login client
exports.login_client_factory = (req, res, next) => {
	return new Promise((resolve, reject) => {
		passport.authenticate("client", (err, client) => {
			if (err) {
				console.error("first error", err);
				reject(err);
			} else if (client) {
				req.login(client, async err => {
					if (err) {
						console.error("second error", err);
						reject(err);
					}

					// update the lastLogin property to date.now()
					await clientDao.update({ _id: client._id }, { $set: { lastLogin: Date.now() } });
					resolve(client);
				});
			} else reject({ status: 401, message: "Incorrect useername or password", error: "UNAUTHORIZED", result: null });
		})(req, res, next);
	});
}