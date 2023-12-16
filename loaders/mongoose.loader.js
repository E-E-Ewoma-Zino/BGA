// Set up mongo data base configuration
const settings = require("../config/index");

module.exports = async (mongoose) => {
	try {
		const connection = await mongoose.connect(settings.testDB);
		console.log("mongoConnection sucessful");
		return connection.connection.db;
	} catch (error) {
		console.error("Failed to connect to db:", error);
	}
};