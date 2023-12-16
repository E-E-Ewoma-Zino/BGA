// 
const { register_client_factory, get_client_factory, update_client_factory, remove_client_factory, get_all_client_factory, login_client_factory } = require("../factory/client.factory");
const ERROR = require("../../../utilities/error.utilities");
// controller for registering a client
exports.register_client = async (req, res) => {
	try {
		const { status, ...more } = await register_client_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}


// controller for getting a client
exports.get_client = async (req, res) => {
	try {
		const { status, ...more } = await get_client_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for getting a client
exports.get_all_client = async (req, res) => {
	try {
		const { status, ...more } = await get_all_client_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for updating a client
exports.update_client = async (req, res) => {
	try {
		const { status, ...more } = await update_client_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for removing a client
exports.remove_client = async (req, res) => {
	try {
		const { status, ...more } = await remove_client_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}

// controller for logging out a client
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

//controller for web client login
exports.login_client = async (req, res, next) => {
	try {
		const client = await login_client_factory(req, res, next);
		return res.status(200).json({ status: 200, message: "client Loged In", error: null, result: { client_id: client._id, username: client.username } });
	} catch (error) {
		console.error("login in errror", error);
		return res.status(ERROR(error).status).json(ERROR(error));
	}
}