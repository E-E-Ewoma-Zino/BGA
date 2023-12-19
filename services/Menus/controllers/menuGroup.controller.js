// 
const ERROR = require("../../../utilities/error.utilities");
const { add_menu_group_factory, get_menu_group_factory, update_menu_group_factory, remove_menu_group_factory, get_all_menu_group_factory } = require("../factory/menuGroup.factory");

// controller for adding a menu group
exports.add_menu_group = async (req, res) => {
	try {
		const { status, ...more } = await add_menu_group_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a menu group
exports.get_menu_group = async (req, res) => {
	try {
		const { status, ...more } = await get_menu_group_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a menu group
exports.get_all_menu_group = async (req, res) => {
	try {
		const { status, ...more } = await get_all_menu_group_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for updating a menu group
exports.update_menu_group = async (req, res) => {
	try {
		const { status, ...more } = await update_menu_group_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for removing a menu group
exports.remove_menu_group = async (req, res) => {
	try {
		const { status, ...more } = await remove_menu_group_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}