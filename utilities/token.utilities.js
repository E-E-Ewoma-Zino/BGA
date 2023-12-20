const jwt = require("jsonwebtoken");
const settings = require("../config/index")

exports.createOtp = () => {
	return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

exports.createToken = (username, user_id, role, family) => {
	return jwt.sign({ username, user_id, role, family }, settings.token_secret, { algorithm: "HS256", expiresIn: "3h" });
}

exports.createRefreshToken = (username, user_id, role, family) => {
	return jwt.sign({ username, user_id, role, family }, settings.refresh_token_secret, { algorithm: "HS256", expiresIn: "6h" });
}