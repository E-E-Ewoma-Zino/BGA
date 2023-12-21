// handle all complex route works here
const menuDao = require("../dao/menu.dao");
const ERROR = require("../../../utilities/error.utilities");
const menuGroupDao = require("../dao/menuGroup.dao");

// Add a new menu
exports.add_menu_factory = async (data) => {
	try {
		const result = await menuDao.add(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to add new menu",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully added menu",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Update a new menu
exports.update_menu_factory = async (data) => {
	try {
		const result = await menuDao.update(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to update menu",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully updated menu",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new menu
exports.get_menu_factory = async (data) => {
	try {
		const result = await menuDao.get(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get menu data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: "Sucessfully found menu",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Get a new menu
exports.get_all_menu_factory = async (data) => {
	try {
		const result = await menuDao.getAll(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to get menu data",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 200,
			message: `Sucessfully found ${result.length} menu`,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Remove a menu
exports.remove_menu_factory = async (data) => {
	try {
		const result = await menuDao.remove(data);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to remove menu",
				error: "NOT_FOUND",
				result
			}
		}

		return {
			status: 201,
			message: "Sucessfully removed menu",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

// Arrange the menu
exports.client_menu_factory = async (data) => {
	try {
		const { client, widget } = data;
		const result = await menuDao.getAll({client});
		const cc = {client, widget}
		if(!widget) delete cc.widget;
		const result2 = await menuGroupDao.getAll(cc);

		if (!result) {
			throw {
				status: 404,
				message: "Failed to add new menu",
				error: "NOT_FOUND",
				result
			}
		}

		const result3 = [];
		console.info("here", result2);

		result.forEach((menu, index, arr) => {
			if(menu.parent === result2[index]?._id){
				result3.push({
					...menu._doc,
					parent: result2[index]._doc
				});
			}else{
				console.log("nothing");
				if(index >= arr.length - 1) {
					result3.push({
						...menu._doc
					});
				}
			}
		});

		console.info("result3", result3);

		const group = {};

		result3.forEach(menu => {
			if (!menu.parent) {
				if (!group[menu._id]) group[menu._id] = {};
				group[menu._id].name = menu.name;
				group[menu._id].url = menu.url;
				return;
			}

			// if(!menu.parent.isActive) return;
			if (!group[menu.parent._id]) group[menu.parent._id] = { menu: [] };
			group[menu.parent._id].name = menu.parent.name;
			group[menu.parent._id].url = menu.parent.url;
			// if(!menu.isActive) return;
			group[menu.parent._id].menu.push({ name: menu.name, url: menu.url });
		});

		return {
			status: 200,
			message: "Client menu " + Object.keys(group).length,
			error: null,
			result: group
		}
	} catch (error) {
		console.info("What", error);
		return ERROR(error);
	}
}