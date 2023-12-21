// This middleware is for authentication for all services
const jwt = require("jsonwebtoken");
const settings = require("../config");
const tokenizerHelper = require("../utilities/tokenizer.utilities");

// exports.isAuthorize = (req, res, next) => {
// 	if (req.isAuthenticated()) return next();

// 	return res.status(401).json({ status: 401, message: "Login to continue", error: "UNAUTHORIZED", result: null });
// }

exports.isAdministrator = (req, res, next) => {
	if (req.role === "ADMINISTRATOR" || req.role === "SUPER_ADMIN") return next();

	return res.status(403).json({ status: 403, message: "You are not allowed to access this route", error: "FORBIDDEN", result: null });
}

exports.isSuperAdmin = (req, res, next) => {
	if (req.role === "SUPER_ADMIN") return next();

	return res.status(403).json({ status: 403, message: "You are not allowed to access this route", error: "FORBIDDEN", result: null });
}


// Verify a user is authorized
exports.isAuthorize = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		res.status(499).json({ status: 499, message: "Provide a valid token", error: "NO_TOKEN_PROVIDED" });
	} else {
		jwt.verify(token, settings.token_secret, { algorithm: 'HS256' }, (error, unlocked) => {
			if (error) {
				if (error.name === 'TokenExpiredError') {
					refresh_token(req, res, next);
				} else {
					res.status(498).json({ status: 498, message: 'Failed to authenticate token', error: error.message });
				}
			} else {
				req.user_id = unlocked.user_id;
				req.username = unlocked.username;
				console.info("inft", unlocked);
				req.role = unlocked.role;

				next();
			}
		});
	}
}

/**
 * ### Auth Middleware
 * If user token is expired refresh it
 */
async function refresh_token(req, res, next) {
	try {
		let the_refresh_token = req.headers.refreshtoken;

		if (!the_refresh_token) {
			return res.status(499).json({ status: 499, message: "Provide a valid token", error: "NO_RTOKEN_PROVIDED" });
		}

		const unlockedRefresh = await new Promise((resolve, reject) => {
			jwt.verify(the_refresh_token, settings.refresh_token_secret, { algorithm: 'HS256' }, (error, unlocked) => {
				if (error) {
					reject(error);
				} else {
					resolve(unlocked);
				}
			});
		});

		// Decode the access token and extract the payload data
		const accessToken = req.headers.authorization;
		const [, payloadBase64] = accessToken.split('.');
		const decodedPayload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));

		// Check if the family field of both payloads match
		if (unlockedRefresh.family !== decodedPayload.family) {
			return res.status(498).json({ error: "Invalid Token", message: "Token family mismatch", status: 498 });
		}

		const { token: newAccessToken } = tokenizerHelper(unlockedRefresh.username, unlockedRefresh.user_id);

		req.newAccessToken = newAccessToken;

		// TODO: Send the newAccessToken to the client. I don't know how to do it for this middleware :(   maybe cookies and headers...

		req.user_id = unlockedRefresh.user_id;
		req.username = unlockedRefresh.username;
		req.is_mobile = true;

		next();
	} catch (error) {
		console.error("err", error);
		if (error instanceof jwt.JsonWebTokenError) return res.status(498).json({ status: 498, error: "Invalid Token", message: error.message });
		return res.status(500).json({ status: 500, message: error.message });
	}
}