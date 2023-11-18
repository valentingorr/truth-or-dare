require("dotenv").config();
 
process.env.mode =
	process.env.mode === "development" ? "development" : "production";

process.env.PORT = process.env.PORT || 3000;

const fs = require("node:fs");
const path = require("node:path");

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./public/"));
app.use(express.static(path.resolve("./public/static/")));

require("./routes/")(app);

app.get("*", (req, res) => {
	res.render("index");
});

const http = require("http")
	.createServer(app);

http.listen(process.env.PORT, console.log("server listening on port", process.env.PORT));
