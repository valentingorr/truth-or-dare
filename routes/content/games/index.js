const Lib = require("../../../lib/");
const router = require("express").Router();

router.get("/", (req, res) => {
	res.json({
		status: true,
		content: []
	});
});

const io = Lib.websocket();

io.on("connection", socket => {
	socket.on("ping", () => console.log("pong"))
});

module.exports = router;
