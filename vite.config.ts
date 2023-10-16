/* eslint-disable import/no-unresolved */
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	plugins: [react(), visualizer()],
	test: {
		environment: "jsdom", // or 'jsdom', 'node'
	},
	// cấu hình port server
	server: {
		port: 5000,
	},
	// enable css source map
	css: {
		devSourcemap: true,
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "./src"),
		},
	},
});
