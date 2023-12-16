const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const clientSchema = new mongoose.Schema({
	fullNames: {
		firstname: String,
		lastname: String,
	},
	username: {
		type: String,
		unique: true
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admin"
	},
	phone: String,
	organization: {
		name: {
			type: String,
		},
		website: {
			type: String,
		}
	},
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

clientSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("client", clientSchema);