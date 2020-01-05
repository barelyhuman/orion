const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");

module.exports = {
	mode: process.env.NODE_ENV,
	entry: "./src/index.js",
	output: {
		filename: process.env.NODE_ENV === "development" ? "index.js" : "index.[contenthash:8].js",
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		modules: [
			path.resolve(__dirname, "src"),
			"node_modules"
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"]
						}
					},
					{ loader: "moon-loader" }
				]
			},
			{
				test: /\.css/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === "development"
						}
					},
					{ loader: "css-loader" }
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: process.env.NODE_ENV === "development" ? "images/[name].[ext]" : "images/[name].[contenthash:8].[ext]"
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		}),
		new MiniCssExtractPlugin({
			filename: process.env.NODE_ENV === "development" ? "index.css" : "index.[contenthash:8].css",
		})
	],
	optimization: {
		minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
	},
	devServer: {
		hot: true,
		open: true
	}
};
