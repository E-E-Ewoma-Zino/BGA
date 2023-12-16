// Manage admin CRUD
const Joi = require("joi");
const ERROR = require("../../../utilities/error.utilities");
const flattenObjectHelper = require("./helper/flattenObject.helper");

// login a web or mobile admin
exports.validate_admin_login = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			username: Joi.string().email().required(),
			password: Joi.string()
				.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
				.min(8).required()
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

// validate the process of adding a admin
exports.validate_add_admin = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			fullNames: Joi.object().keys({
				firstname: Joi.string().required(),
				lastname: Joi.string().required(),
			}),
			username: Joi.string().email().required(),
			password: Joi.string()
			.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
			.min(8).required(),
			role: Joi.string().valid("ADMINISTRATOR").required(),
			phone: Joi.string().required()
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

// validate the process of updating a admin info
exports.validate_update_admin = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			fullNames: Joi.object().keys({
				firstname: Joi.string(),
				lastname: Joi.string(),
			}),
			role: Joi.string().valid("ADMINISTRATOR"),
			phone: Joi.string(),
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

		req.body = flattenObjectHelper(value);
		return next();
	} catch (error) {
		res.status(ERROR(error).status).json(ERROR(error));
	}
}

// validate the process of retriving a admin
exports.validate_get_admin = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
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

// validate the process of removing a admin
exports.validate_remove_admin = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
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