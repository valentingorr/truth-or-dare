process.env.mode =
	process.env.mode === "production" ? "production" : "development";

const webpack = require("webpack");

const path = require("node:path");

module.exports = {
	mode: process.env.mode,
	target: "web",
	devtool: "inline-source-map",
	watch: process.env.mode === "development",
	watchOptions: {
		ignored: [
			"./index.js",
			"./package.json",
			"./package-lock.json",
			"**/modules",
			"**/node_modules",
			"**/public/",
		],
	},
	stats: "errors-only",
	entry: path.resolve(__dirname, "./src/index.jsx"),
	output: {
		path: path.resolve(__dirname, "./public/static/bundle/"),
		filename: "app.bundle.js"
	},
	plugins: [
		new webpack.DefinePlugin({
			mode: JSON.stringify(process.env.mode)
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						]
					}
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(png|jp(e*)g)$/,
				exclude: /node_modules/,
				use: [{
					loader: "url-loader",
					options: {
						limit: 8000,
						name: "images/[hash]-[name].[ext]"
					}
				}]
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: ["@svgr/webpack", "url-loader"]
			}
		]
	}
};
