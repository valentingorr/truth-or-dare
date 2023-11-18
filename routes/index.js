const path = require("node:path");
const fs = require("node:fs");

module.exports = app => {
	const content = fs.readdirSync(path.resolve(__dirname, "./content"));	
	content.forEach(item => {
		app.use(`/${item}`, require(path.resolve(__dirname, "./content/", item)));
	})
};
