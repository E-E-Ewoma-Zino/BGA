// Manage widget CRUD
const Joi = require("joi");
const { MulterError } = require("multer");
const ERROR = require("../../../utilities/error.utilities");
const OSS = require("../../../middleware/oss.middleware");
const deleteFile = require("./helper/deleteFileMessage.helper");

const uploadIcon = OSS.uplaodFile.single("icon");

// validate the process of adding a widget
exports.validate_add_widget = (req, res, next) => {
	uploadIcon(req, res, async err => {
		try {
			if (err instanceof MulterError) {
				throw {
					status: 504,
					message: "Could not upload video",
					error: err,
					result: null
				}
			}

			const schema = Joi.object().keys({
				name: Joi.string().required(),
				url: Joi.string(),
				isActive: Joi.boolean().required(),
				internal: Joi.boolean().required(),
				icon: Joi.object().required(),
				client: Joi.string().alphanum().required()
			});

			const input = {
				...req.body,
				icon: req.file
			}

			const { value, error } = schema.validate(input);

			if (error) {
				// Because the code came here, that means that the files were uploaded.
				// But this code will prevent the code from proceeding.
				// Therefore, we would delete the already uploaded media now
				const deleteLogoMessage = await deleteFile(value.icon);

				throw {
					status: 400,
					deleteLogoMessage,
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
	});
}

// validate the process of updating a widget info
exports.validate_update_widget = (req, res, next) => {
	uploadIcon(req, res, async err => {
		try {
			if (err instanceof MulterError) {
				throw {
					status: 504,
					message: "Could not upload video",
					error: err,
					result: null
				}
			}

			const schema = Joi.object().keys({
				name: Joi.string(),
				url: Joi.string(),
				isActive: Joi.boolean(),
				internal: Joi.boolean(),
				icon: Joi.object(),
				_id: Joi.string().alphanum().required()
			});

			const input = {
				...req.body,
				icon: req.file,
				_id: req.params.id
			}

			const { value, error } = schema.validate(input);

			if (error) {
				// Because the code came here, that means that the files were uploaded.
				// But this code will prevent the code from proceeding.
				// Therefore, we would delete the already uploaded media now
				const deleteLogoMessage = await deleteFile(value.icon);

				throw {
					status: 400,
					deleteLogoMessage,
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
	});
}

// validate the process of retriving a widget
exports.validate_get_widget = (req, res, next) => {
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

// validate the process of retriving a widget
exports.validate_get_all_widget = (req, res, next) => {
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

// validate the process of removing a widget
exports.validate_remove_widget = (req, res, next) => {
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