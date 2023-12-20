// Manage menuGroup CRUD
const Joi = require("joi");
const ERROR = require("../../../utilities/error.utilities");

// validate the process of adding a menuGroup
exports.validate_add_menu_group = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			name: Joi.string().required(),
			url: Joi.string(),
			isActive: Joi.boolean().required(),
			client: Joi.string().alphanum().required(),
			widget: Joi.string().alphanum()
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

// validate the process of updating a menuGroup info
exports.validate_update_menu_group = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			name: Joi.string(),
			url: Joi.string(),
			isActive: Joi.boolean(),
			widget: Joi.string().alphanum().required(),
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

// validate the process of retriving a menuGroup
exports.validate_get_menu_group = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			_id: Joi.string().alphanum().required(),
			client: Joi.string().alphanum().required()
		});

		const input = {
			...req.body,
			client: req.query.client,
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

// validate the process of retriving a menuGroup
exports.validate_get_all_menu_group = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			client: Joi.string().alphanum().required(),
			widget: Joi.string().alphanum()
		});

		const input = {
			...req.body,
			...req.query,
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

// validate the process of removing a menuGroup
exports.validate_remove_menu_group = (req, res, next) => {
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