// handle all complex route works here
const passport = require("passport");
const adminDao = require("../dao/admin.dao");
const ERROR = require("../../../utilities/error.utilities");

// Add a new admin
exports.add_admin_factory = async (data) => {
	try {
		const { password, ...others } = data;

		const result = await adminDao.add(others, password);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to add new admin",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully added admin",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Update a new admin
exports.update_admin_factory = async (data) => {
	try {
		const result = await adminDao.update(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to update admin",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully updated admin",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new admin
exports.get_admin_factory = async (data) => {
	try {
		const result = await adminDao.get(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get admin data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully found admin",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new admin
exports.get_all_admin_factory = async (data) => {
	try {
		const result = await adminDao.getAll(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get admin data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: `Sucessfully found ${result.length} admin`,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Remove a admin
exports.remove_admin_factory = async (data) => {
	try {
		const result = await adminDao.remove(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to remove admin",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully removed admin",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// This function helps with the login admin
exports.login_admin_factory = (req, res, next) => {
	return new Promise((resolve, reject) => {
		passport.authenticate("admin", (err, admin) => {
			if (err) {
				console.error("first error", err);
				reject(err);
			} else if (admin) {
				req.login(admin, async err => {
					if (err) {
						console.error("second error", err);
						reject(err);
					}

					// update the lastLogin property to date.now()
					await adminDao.update({_id: admin._id, lastLogin: Date.now()});
					resolve(admin);
				});
			} else reject({ status: 401, message: "Incorrect useername or password", error: "UNAUTHORIZED", result: null });
		})(req, res, next);
	});
}