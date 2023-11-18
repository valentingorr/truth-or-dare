import React from "react";

export default props => {
	return (
		<>
			<h1 id="code">
				{ props.code || 400 }
			</h1>
			<p className="error">
				{ props.error || "Bad Request." }
			</p>
		</>
	);
};
