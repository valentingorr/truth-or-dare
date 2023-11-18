import {
	combineReducers
} from "redux";

export default combineReducers(({
	user: (state = 0, action) => {
		switch(action.type) {
			case "SET":
				return action.user;
				break;
			default:
				return state;
				break;
		}
	}
}));
