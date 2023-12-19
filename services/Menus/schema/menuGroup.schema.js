const mongoose = require("mongoose");

const menuGroupSchema = new mongoose.Schema({
	name: String,
	url: {
		type: String,
		default: '#'
	},
	isActive: {
		type: Boolean,
		default: true
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "client"
	},
	perent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "menuGroup"
	},
	subMenu: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "menu"
	}]
}, { timestamps: true });

module.exports = mongoose.model("menuGroup", menuGroupSchema);