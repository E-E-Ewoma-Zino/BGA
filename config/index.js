// Config dot env
const dotenv = require("dotenv");
dotenv.config();

const settings = {
	port: process.env.PORT,
	testDB: process.env.TEST_DATABASE,
	sessionSecret: process.env.SECRET,
	charityAppId: process.env.CHARITY_APP_ID,
	charityAppKey: process.env.CHARITY_APP_KEY,
	sendgridKey: process.env.SENDGRID_KEY,
	sendgridMail: process.env.SENDGRID_SENDER
}

module.exports = settings;