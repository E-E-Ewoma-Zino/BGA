// 
const ERROR = require("../../../utilities/error.utilities");
const { add_menu_factory, get_menu_factory, update_menu_factory, remove_menu_factory, get_all_menu_factory, client_menu_factory } = require("../factory/menu.factory");

// controller for adding a menu
exports.add_menu = async (req, res) => {
	try {
		const { status, ...more } = await add_menu_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for adding a menu
exports.client_menu = async (req, res) => {
	try {
		const { status, ...more } = await client_menu_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a menu
exports.get_menu = async (req, res) => {
	try {
		const { status, ...more } = await get_menu_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a menu
exports.get_all_menu = async (req, res) => {
	try {
		const { status, ...more } = await get_all_menu_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for updating a menu
exports.update_menu = async (req, res) => {
	try {
		const { status, ...more } = await update_menu_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for removing a menu
exports.remove_menu = async (req, res) => {
	try {
		const { status, ...more } = await remove_menu_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}