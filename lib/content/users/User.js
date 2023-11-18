const Events = require("events");
const { v4: uuid } = require("uuid");

class User extends Events {
  constructor(parameters) {
    super();
    Object.assign(this, {
      createdAt: new Date().getTime(),
      time: 1000 * 60 * 10, // 10 minutes timeout
      ...parameters,
			token: uuid(),
			socket: null,
      timeoutEvents: [
				() => this.emit("expired")
			],
      timeout: false,
    });
    this.update();
  }

  update() {
    this.updatedAt = new Date().getTime();
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
			this.timeoutEvents
				.forEach(event => event());
    }, this.time);
  }
}

module.exports = User;
