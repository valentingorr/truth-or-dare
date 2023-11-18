import React, {
	useEffect
} from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as CONTEXT from "./context.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";

import reducers from "./redux/reducers.js";
import * as ACTIONS from "./redux/actions.js";

import Navigation from "./routes/index.jsx";

import "./style/style.scss";

import { io } from "socket.io-client";
const socket = io({
	auth: {
		token: sessionToken
	}
});

const store = configureStore({
	reducer: reducers,
	devTools: ( mode === "development" )
});

const App = () => {

	const user = useSelector(state => state.user);

	useEffect(() => {
		socket.on("connect_error", err => {
			console.log("Can't connect to websocket server,", err.message);
		});
	}, []);

	return (
		<CONTEXT.default {...{ socket }}>
			<Routes>
				{
					Navigation.routes.map(route => (
						<Route
							key={route.name}
							exact={route.exact || false}
							path={route.path}
							element={<route.element />}
						/>
					))
				}
				<Route path="*" element={
					<Navigation.errorRoute
						code={404}
						error="Page Not Found."
					/>
				} />
			</Routes>
		</CONTEXT.default>
	);
};

export default App;

const rootNode = document.getElementById("root");
createRoot(rootNode).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
