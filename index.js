require("dotenv").config();
 
process.env.mode =
	process.env.mode === "development" ? "development" : "production";

process.env.PORT = process.env.PORT || 3000;

const fs = require("node:fs");
const path = require("node:path");

const Lib = require("./lib/");

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./public/"));
app.use(express.static(path.resolve("./public/static/")));

const session = require("express-session");
app.use(session({
	cookieName: "secret",
	secret: "1m4QiekdPd8cMJBEWTKylTaJUZ8hzFv3",
	resave: false,
	saveUninitialized: true,
	httpOnly: true,
	secure: true,
	ephemeral: true,
	expires: new Date(Date.now() + (60 * 60 * 1000)),
	cookie: {
		maxAge: 1000 * 60 * 10
	}
}));

const http = require("http")
	.createServer(app);

const io = Lib.websocket(http);
io.use((socket, next) => {
	const user = Lib.users().token(socket.handshake.auth.token);
	if(!user) return next(new Error("invalid token."));
	user.socket = socket.id;
	user.update();
	next();
});

app.use((req, res, next) => {
	const user = Lib.users().session(req.sessionID, true);
	user.update();
	req.user = user;
	req.renderContent = {
		token: user.token
	};
	next();
});

app.get("/test", (req, res) => res.json(Lib.users().count));

require("./routes/")(app);

app.get("*", (req, res) => {
	res.render("index", req.renderContent);
});

http.listen(process.env.PORT, console.log("server listening on port", process.env.PORT));
