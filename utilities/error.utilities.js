/**
 * Return an object that handels the general catch error block
 */
// const ERROR = (err) => {
// 	return {
// 		status: err?.status || getErrorStatusCode(err?.name),
// 		message: err?.message || "Something went wrong!",
// 		error: err?.error ? err.error : "SERVER_ERROR",
// 		...err,
// 		result: err?.result || null
// 	}
// };
const ERROR = (err) => ({
	status: err?.status || getErrorStatusCode(err?.name).code,
	message: err?.message || "Something went wrong!",
	error: err?.error ? err.error : getErrorStatusCode(err?.name).name,
	...err,
	result: err?.result || null
});

module.exports = ERROR;

function getErrorStatusCode(errName) {
	console.info("ERROR NAME:", errName);

	switch (errName) {
		case "TypeError": return { code: 500, name: "SERVER_ERROR" };
		case "MongooseError": return { code: 504, name: "GATEWAY_TIMEOUT" };
		case "CastError": return { code: 400, name: "BAD_REQUEST" };
		case "SyncIndexesError": return { code: 400, name: "BAD_REQUEST" };
		case "MissingSchemaError": return { code: 500, name: "SERVER_ERROR" };
		case "DocumentNotFoundError": return { code: 404, name: "NOT_FOUND" };
		case "ObjectExpectedError": return { code: 400, name: "BAD_REQUEST" };
		case "ObjectParameterError": return { code: 400, name: "BAD_REQUEST" };
		case "OverwriteModelError": return { code: 400, name: "BAD_REQUEST" };
		case "ParallelSaveError": return { code: 403, name: "FORBIDDEN" };
		case "ParallelValidateError": return { code: 403, name: "FORBIDDEN" };
		case "MongooseServerSelectionError": return { code: 504, name: "GATEWAY_TIMEOUT" };
		case "StrictModeError": return { code: 400, name: "BAD_REQUEST" };
		case "ValidationError": return { code: 403, name: "FORBIDDEN" };
		case "ValidatorError": return { code: 403, name: "FORBIDDEN" };
		case "StrictPopulateError": return { code: 500, name: "SERVER_ERROR" };
		default: return { code: 500, name: "SERVER_ERROR" };
	}
}