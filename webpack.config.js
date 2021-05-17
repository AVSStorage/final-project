import path from "path";
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import InterpolateHtmlPlugin from 'interpolate-html-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpackConfig = () => ({
    entry: "./src/index.tsx",
    ...(process.env.production || !process.env.development
        ? {}
        : { devtool: "eval-source-map" }),
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
                exclude: /build/,
            },

            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader","sass-loader"],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3)$/,
                use: ["file-loader"]
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin({configFile:  "./tsconfig.json" })]
    },
    devServer: {
        port: 3000,
        open: true,
        publicPath: '/',
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
    },
    plugins: [
     
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: 'index.html'
        }),
        new InterpolateHtmlPlugin({
            HtmlWebpackPlugin
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./src/**/*.{ts,tsx,js,jsx}",
            },
        }),
       
    ],
});

export default webpackConfig;