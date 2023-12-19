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
	}
}, { timestamps: true });

module.exports = mongoose.model("menu", menuSchema);