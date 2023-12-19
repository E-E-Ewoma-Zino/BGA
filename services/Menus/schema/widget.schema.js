const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema({
	name: String,
	url: String,
	icon:  {
		fieldname: String,
		originalname: String,
		encoding: String,
		mimetype: String,
		destination: String,
		filename: String,
		path: String,
		size: Number,
		url: String
	},
	isActive: {
		type: String,
		default: true
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "client"
	}
}, { timestamps: true });

module.exports = mongoose.model("widget", widgetSchema);