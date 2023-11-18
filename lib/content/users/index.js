const User = require("./User.js");

const users = new Proxy([], {
	get(target, prop) {
		const registeredMethods = {
			session: sessionID => {
				let user = target.find(user => user.session === sessionID);
				if(!user) {
					user = new User({
						session: sessionID
					});
					target.push(user);
					user.on("expired", () => {
						const index = target.indexOf(user);
						target.splice(index, 1);
					})
				}
				return user;
			},
			token: token => target.find(user => user.token === token)
		};

		const registeredProps = {
			count: target.length
		}

		if(prop in registeredMethods) return (...args) => registeredMethods[prop](...args);
		if(prop in registeredProps) return registeredProps[prop]();
		return target[prop];
	}
});

module.exports = () => users;
