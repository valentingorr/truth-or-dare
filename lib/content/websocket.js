const { Server } = require("socket.io");

let io;
module.exports = http => {
	if(http) io = new Server(http);
	return io;
};
