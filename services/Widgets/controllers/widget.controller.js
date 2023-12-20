// 
const ERROR = require("../../../utilities/error.utilities");
const { add_widget_factory, get_widget_factory, update_widget_factory, remove_widget_factory, get_all_widget_factory } = require("../factory/widget.factory");

// controller for adding a widget
exports.add_widget = async (req, res) => {
	try {
		const { status, ...more } = await add_widget_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a widget
exports.get_widget = async (req, res) => {
	try {
		const { status, ...more } = await get_widget_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a widget
exports.get_all_widget = async (req, res) => {
	try {
		const { status, ...more } = await get_all_widget_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for updating a widget
exports.update_widget = async (req, res) => {
	try {
		const { status, ...more } = await update_widget_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for removing a widget
exports.remove_widget = async (req, res) => {
	try {
		const { status, ...more } = await remove_widget_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}