import React, {
	useContext,
	useState,
	useEffect
} from "react";

import * as CONTEXT from "../../context.jsx";

import axios from "axios";

const LoadingGame = props => {
	return (
		<div className="loading">
			<div>loading</div>
		</div>
	);
};

export default props => {

	const socket = useContext(CONTEXT.socket);

	const [games, setGames] = useState([]);

	useEffect(() => {
		axios({
			method: "get",
			url: "/games"
		}).then(response => {
			if(response.status !== 200) return;
			setGames(response.data.content);
		});
		socket.emit("room-join", "games");
		socket.on("games-update", (event, receive) => {
			console.log({ receive })
		});
		return () => {
			socket.emit("room-leave", "games");
		};
	}, []);

	return (
		<div className="wrapper">
			<div className="card">
				<p>Rejoindre une partie</p>
			</div>
			<p>Action ou vérité</p>
			<div className="card">
				<p>Créer une partie</p>
			</div>
		</div>
	);
};
