const deleteFileUtilities = require("../../../../utilities/deleteFile.utilities");

// Helps in using the deleteFileUtilities and forms a message
async function deleteFile(file) {
	let deleteMessage = null;
	
	if (file) {
		const logoPath = `${file.destination}/${file.filename}`;
		const deleteFile = await deleteFileUtilities(logoPath);
		if (deleteFile.res.status === 204) deleteMessage = "Successfuly removed " + file.filename;
		else deleteMessage = "Could not remove " + file.filename;
	}

	return deleteMessage;
}

module.exports = deleteFile;