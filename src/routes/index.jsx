import React, {
	useEffect
} from "react";

import Home from "./content/Home.jsx";
import ErrorRoute from "./content/Error.jsx";

const Provider = props => {

	useEffect(() => {
		document.title = props.title || "Actions ou Vérités";
	}, [props.title]);

	return (
		<div route={props.route}>
			{ props.children }
		</div>
	);
};

const wrapRoute = route => {
	const Element = route.element;
	route.element = props => {
		return (
			<Provider title={route.title} route={route.name}>
				<Element {...props} />
			</Provider>
		);
	};
	return route;
};

const Navigation = {
	errorRoute: wrapRoute({
		name: "Error",
		element: ErrorRoute,
		title: "Erreur"
	}).element,
	routes: [
		{
			name: "Home",
			path: "/",
			exact: true,
			element: Home
		}
	].map(route => wrapRoute(route))
};

export default Navigation;
