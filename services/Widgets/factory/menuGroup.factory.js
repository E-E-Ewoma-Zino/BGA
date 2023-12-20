// handle all complex route works here
const menuGroup = require("../dao/menuGroup.dao");
const ERROR = require("../../../utilities/error.utilities");

// Add a new menu group
exports.add_menu_group_factory = async (data) => {
	try {
		const result = await menuGroup.add(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to add new menu group",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully added menu group",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Update a new menu group
exports.update_menu_group_factory = async (data) => {
	try {
		const result = await menuGroup.update(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to update menu group",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully updated menu group",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new menu group
exports.get_menu_group_factory = async (data) => {
	try {
		const result = await menuGroup.get(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get menu group data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully found menu group",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new menu group
exports.get_all_menu_group_factory = async (data) => {
	try {
		const result = await menuGroup.getAll(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get menu group data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: `Sucessfully found ${result.length} menu group`,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Remove a menu group
exports.remove_menu_group_factory = async (data) => {
	try {
		const result = await menuGroup.remove(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to remove menu group",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully removed menu group",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}