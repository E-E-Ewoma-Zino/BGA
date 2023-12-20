// Manage menu CRUD
const Joi = require("joi");
const ERROR = require("../../../utilities/error.utilities");

// validate the process of adding a menu
exports.validate_add_menu = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			name: Joi.string().required(),
			url: Joi.string().required(),
			isActive: Joi.boolean().required(),
			client: Joi.string().alphanum().required(),
			parent: Joi.string().alphanum()
		});

		const { value, error } = schema.validate(req.body);

		if (error) {
			throw {
				status: 400,
				message: "Check your input and try again!",
				error,
				result: value
			}
		}

		req.body = value;
		return next();
	} catch (error) {
		res.status(ERROR(error).status).json(ERROR(error));
	}
}

// validate the process of updating a menu info
exports.validate_update_menu = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			name: Joi.string(),
			url: Joi.string(),
			isActive: Joi.boolean(),
			parent: Joi.string().alphanum(),
			_id: Joi.string().alphanum().required()
		});

		const input = {
			...req.body,
			_id: req.params.id
		}

		const { value, error } = schema.validate(input);

		if (error) {
			throw {
				status: 400,
				message: "Check your input and try again!",
				error,
				result: value
			}
		}

		req.body = value;
		return next();
	} catch (error) {
		res.status(ERROR(error).status).json(ERROR(error));
	}
}

// validate the process of retriving a menu
exports.validate_get_menu = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			_id: Joi.string().alphanum().required(),
			client: Joi.string().alphanum().required()
		});

		const input = {
			...req.body,
			_id: req.params.id
		}

		const { value, error } = schema.validate(input);

		if (error) {
			throw {
				status: 400,
				message: "Check your input and try again!",
				error,
				result: value
			}
		}

		req.body = value;
		return next();
	} catch (error) {
		res.status(ERROR(error).status).json(ERROR(error));
	}
}

// validate the process of retriving a menu
exports.validate_get_all_menu = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			client: Joi.string().alphanum().required()
		});

		const input = {
			...req.body,
			client: req.params.id
		}

		const { value, error } = schema.validate(input);

		if (error) {
			throw {
				status: 400,
				message: "Check your input and try again!",
				error,
				result: value
			}
		}

		req.body = value;
		return next();
	} catch (error) {
		res.status(ERROR(error).status).json(ERROR(error));
	}
}

// validate the process of removing a menu
exports.validate_remove_menu = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			_id: Joi.string().alphanum().required(),
			client: Joi.string().alphanum().required()
		});

		const input = {
			...req.body,
			_id: req.params.id
		}

		const { value, error } = schema.validate(input);

		if (error) {
			throw {
				status: 400,
				message: "Check your input and try again!",
				error,
				result: value
			}
		}

		req.body = value;
		return next();
	} catch (error) {
		res.status(ERROR(error).status).json(ERROR(error));
	}
}