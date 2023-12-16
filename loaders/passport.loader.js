const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../services/Authentication/schema/admin.schema");
const Client = require("../services/Authentication/schema/client.schema");

module.exports = (passport) => {
	passport.use("client", new LocalStrategy(Client.authenticate()));
	passport.use("admin", new LocalStrategy(Admin.authenticate()));

	passport.serializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, {
				_id: user._id,
				username: user.username,
				role: user.role
			});
		});
	});

	passport.deserializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, user);
		});
	});
}