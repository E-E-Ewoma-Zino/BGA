// This file uses the Alicloud OSS to delete files from the storage
const OSS = require("../middleware/oss.middleware");

module.exports = async function deleteFile(filePath) {
	try {
		const result = await OSS.client.delete(filePath);

		console.log("Delete file result:", result);

		return result;
	} catch (e) {
		console.log("Failled to delete the file:", e);
		return e;
	}
}