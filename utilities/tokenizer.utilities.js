const { createToken, createRefreshToken } = require("./token.utilities");

module.exports = (username, id, role) => {
	const family = id + '-' + Date.now();

	const token = createToken(username, id, role, family);
	const refreshToken = createRefreshToken(username, id, role, family);

	return {
		token,
		refreshToken
	}
}