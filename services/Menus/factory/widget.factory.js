// handle all complex route works here
const widgetDao = require("../dao/widget.dao");
const ERROR = require("../../../utilities/error.utilities");

// Add a new widget
exports.add_widget_factory = async (data) => {
	try {
		const result = await widgetDao.add(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to add new widget",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully added widget",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Update a new widget
exports.update_widget_factory = async (data) => {
	try {
		const result = await widgetDao.update(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to update widget",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully updated widget",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new widget
exports.get_widget_factory = async (data) => {
	try {
		const result = await widgetDao.get(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get widget data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully found widget",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new widget
exports.get_all_widget_factory = async (data) => {
	try {
		const result = await widgetDao.getAll(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get widget data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: `Sucessfully found ${result.length} widget`,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Remove a widget
exports.remove_widget_factory = async (data) => {
	try {
		const result = await widgetDao.remove(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to remove widget",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully removed widget",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}