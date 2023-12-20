const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
	name: String,
	url: String,
	isActive: {
		type: Boolean,
		default: true
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "client"
	},
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "menuGroup"
	},
	widget: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "widget"
	}
}, { timestamps: true });

module.exports = mongoose.model("menu", menuSchema);