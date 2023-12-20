require("dotenv").config();
require("console-info");
require("console-warn");
require("console-error");
const cors = require("cors");
const Express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const settings = require("../config/index");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const Widgets = require("../services/Widgets/routes/index.routes");
const Authentication = require("../services/Authentication/routes/index.routes");

// Express start up configuration
module.exports = function () {
	const app = Express();

	app.use(Express.urlencoded({
		extended: true,
		type: "application/x-www-form-urlencoded"
	}));

	// app initialization
	app.use(Express.json());

	// setup cookie
	app.use(cookieParser("secret"));

	// set up cors
	app.use(cors());

	// sessions initialization
	app.use(session({
		store: MongoStore.create({
			mongoUrl: settings.testDB,
			ttl: 14 * 24 * 60 * 60,
			autoRemove: 'native' 
		}),
		secret: settings.sessionSecret,
		resave: false,
		saveUninitialized: true
		// cookie: {
		// 	maxAge: 60 * 60 * 1000
		// }
	}));

	// passport initialization
	app.use(passport.initialize());
	// presistent login sessions
	app.use(passport.session());

	// initialize mongoose
	require("./mongoose.loader")(mongoose);
	// setup passport
	require("./passport.loader")(passport);

	// ___App routes___
	app.get('/', (req, res) => res.status(200).json({ status: 200, message: "GBA____v2.0.0", error: null, result: '/' })); // index route
	// Admin
	Authentication.admin(app);
	// Client
	Authentication.client(app);
	// Menu and Widget
	Widgets(app);
	// 404 
	app.get('*', (req, res) => res.status(404).json({ status: 404, message: "This route does not exist", error: null, result: '' }));

	// Start application
	let server = app.listen(settings.port, () => {
		console.log("server running on " + settings.port);
	});

	// return to index.js
	return server;
}