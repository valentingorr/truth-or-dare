import React, { createContext } from "react";

export const socket = createContext();
export default props => {
	return (
		<socket.Provider value={props.socket}>
			{props.children}
		</socket.Provider>
	);
};
