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
	sendgridMail: process.env.SENDGRID_SENDER,
	// token
	token_secret: process.env.TOKEN_SECRET,
	refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
	// alibaba
	alibabaKeyID: process.env.ALIBABA_KEY_ID,
	alibabaBucketName: process.env.ALIBABA_BUCKET_NAME,
	alibabaRegion: process.env.ALIBABA_BUCKET_REGION,
	alibabaUrlEndpoint: process.env.ALIBABA_URL_ENDPOINT,
	alibabaKeySecret: process.env.ALIBABA_KEY_SECRET,
	alibabaApiVersion: process.env.ALIBABA_API_VERSION,
}

module.exports = settings;