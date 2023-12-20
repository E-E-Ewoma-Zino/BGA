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
	widget: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "widget"
	}
}, { timestamps: true });

module.exports = mongoose.model("menuGroup", menuGroupSchema);