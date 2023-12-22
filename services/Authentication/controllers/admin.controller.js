// 
const ERROR = require("../../../utilities/error.utilities");
const tokenizerUtilities = require("../../../utilities/tokenizer.utilities");
const { add_admin_factory, get_admin_factory, update_admin_factory, remove_admin_factory, get_all_admin_factory, login_admin_factory } = require("../factory/admin.factory");

// controller for adding a admin
exports.add_admin = async (req, res) => {
	try {
		const { status, ...more } = await add_admin_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a admin
exports.get_admin = async (req, res) => {
	try {
		const { status, ...more } = await get_admin_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a admin
exports.get_all_admin = async (req, res) => {
	try {
		const { status, ...more } = await get_all_admin_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for updating a admin
exports.update_admin = async (req, res) => {
	try {
		const { status, ...more } = await update_admin_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for removing a admin
exports.remove_admin = async (req, res) => {
	try {
		const { status, ...more } = await remove_admin_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for logging out a admin
exports.logout = async (req, res) => {
	try {
		req.logout((err) => {
			if (!err) res.status(200).json({ status: 200, message: "Successfully Loged out!", error: err.message, result: null });
			else throw err;
		});
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

//controller for web admin login
exports.login_admin = async (req, res, next) => {
	try {
		const admin = await login_admin_factory(req, res, next);

		const the_token = tokenizerUtilities(admin.username, admin._id, admin.role);

		return res.status(200).json({ status: 200, message: "admin Loged In", error: null, result: { admin_id: admin._id, username: admin.username, firstname: admin.fullNames.firstname, lastname: admin.fullnames.lastname, token: the_token } });
	} catch (error) {
		console.error("login in errror", error);
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}