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
	internal: Boolean, // If widget is internal, the url property will be empty. But if it is external it will have a url
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