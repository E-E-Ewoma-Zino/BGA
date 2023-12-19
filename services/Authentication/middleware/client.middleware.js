const Joi = require("joi");
const ERROR = require("../../../utilities/error.utilities");
const flattenObjectHelper = require("./helper/flattenObject.helper");

// login a web or mobile client
exports.validate_client_login = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			username: Joi.string().email().required(),
			password: Joi.string()
				.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)
				.message('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.')
				.required()
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

// Register a web or mobile client
exports.validate_register_client = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			username: Joi.string().email().required(),
			password: Joi.string()
				.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)
				.message('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.')
				.required(),
			fullNames: Joi.object().keys({
				firstname: Joi.string().required(),
				lastname: Joi.string().required(),
			}),
			phone: Joi.string().required(),
			admin: Joi.string().alphanum().required(),
			organization: Joi.object().keys({
				name: Joi.string(),
				website: Joi.string()
			})
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

// validate the process of updating a client info
exports.validate_update_client = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			fullNames: Joi.object().keys({
				firstname: Joi.string(),
				lastname: Joi.string(),
			}),
			phone: Joi.string(),
			organization: Joi.object().keys({
				name: Joi.string(),
				website: Joi.string()
			}),
			role: Joi.string().required(), // this role is used to make sure the user is allowed to edit this route
			_id: Joi.string().alphanum().required(),
			admin: Joi.string().alphanum().required().error(Error("You are not loged in"))
		});

		const input = {
			...req.body,
			_id: req.params.id,
			role: req.role,
			admin: req.user_id
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

		// simplify the object
		req.body = flattenObjectHelper(value);
		return next();
	} catch (error) {
		res.status(ERROR(error).status).json(ERROR(error));
	}
}

// validate the process of retriving a client
exports.validate_get_client = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			_id: Joi.string().alphanum().required(),
			role: Joi.string().required(), // this role is used to make sure the user is allowed to edit this route
			admin: Joi.string().alphanum().required().error(Error("You are not loged in"))
		});

		const input = {
			...req.body,
			_id: req.params.id,
			role: req.role,
			admin: req.user_id
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

// validate the process of retriving a client
exports.validate_get_all_client = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			role: Joi.string().required(), // this role is used to make sure the user is allowed to edit this route
			admin: Joi.string().alphanum().required()
		});

		const input = {
			...req.body,
			role: req.role,
			admin: req.user_id
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

// validate the process of removing a client
exports.validate_remove_client = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			_id: Joi.string().alphanum().required(),
			role: Joi.string().required(), // this role is used to make sure the user is allowed to edit this route
			admin: Joi.string().alphanum().required().error(Error("You are not loged in"))
		});

		const input = {
			...req.body,
			_id: req.params.id,
			role: req.role,
			admin: req.user_id
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