const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new mongoose.Schema({
	fullNames: {
		firstname: String,
		lastname: String,
	},
	username: {
		type: String,
		unique: true
	},
	role: {
		type: String,
		enum: ["ADMINISTRATOR", "MENU_SPECIALIST"],
		default: "MENU_SPECIALIST"
	},
	clients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "client"
	}],
	phone: String,
	deleted: {
		status: {
			type: Boolean,
			default: false
		},
		deletedAt: {
			type: Date,
			default: null
		}
	},
	isActive: {
		type: Boolean,
		default: true
	},
	lastLogin: {
		type: Date,
		default: Date.now
	}
}, { timestamps: true });

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("admin", adminSchema);