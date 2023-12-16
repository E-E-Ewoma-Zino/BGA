// This middleware is for authentication for all services

exports.isAuthorize = (req, res, next) => {
	if(req.isAuthenticated()) return next();

	return res.status(401).json({status: 401, message: "Login to continue", error: "UNAUTHORIZED", result: null});
}

exports.isAdministrator = (req, res, next) => {
	if(req.user.role === "ADMINISTRATOR" || req.user.role === "SUPER_ADMIN") return next();

	return res.status(403).json({status: 403, message: "You are not allowed to access this route", error: "FORBIDDEN", result: null});
}

exports.isSuperAdmin = (req, res, next) => {
	if(req.user.role === "SUPER_ADMIN") return next();

	return res.status(403).json({status: 403, message: "You are not allowed to access this route", error: "FORBIDDEN", result: null});
}