import { Server as HTTPServer } from "@hapi/hapi";
import { init } from "../src/main";

export let server: HTTPServer;

export async function mochaGlobalSetup() {
	server = await init();
	server.initialize();
};

export function mochaGlobalTeardown() {
	process.exit(0);
};