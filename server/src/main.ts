// Filepath aliasing to avoid relative-imports whenever possible, this must stay
// at the top of this file as the first statement
import "module-alias/register";

import { JSONDatabase } from "./utils/database/json";
import { loadConfig } from "./utils/config";
import { Request, Server } from "@hapi/hapi";
import cookie from "@hapi/cookie";
import inert from "@hapi/inert";
import { Logger } from "tslog";
import path from "path";
import glob from "glob";


export const isDev = process.env.NODE_ENV?.startsWith(`dev`);
export const config = loadConfig();
export const database = new JSONDatabase(config.database);
export const log = new Logger({
	displayFunctionName: false,
	displayFilePath: "hidden",
	minLevel: isDev ? `silly` : `info`,
});

// Handle the system exiting so we can cleanup before shutting down
import { cleanExit } from "./utils/cleanExit";
process.on(`uncaughtException`, cleanExit);
process.on(`SIGTERM`, cleanExit);
process.on(`SIGINT`, cleanExit);


async function init() {

	const server = new Server({
		port: config.server.port,
		routes: {
			files: {
				relativeTo: path.join(__dirname, `../site`),
			},
			cors: !isDev,
		},
	});

	await server.register([inert, cookie]);

	/*
	This allows for authenticating with the API through the use of cookies, this
	is most recommended for browser purposes since the API also accepts BASIC
	authentication which is simpler for most programmatic systems to utilize,
	though if a non-browser based request does utilize the cookie authentication
	the API won't reject the request and fulfill it anyway.
	*/
	server.auth.strategy(`session`, `cookie`, {
		cookie: {
			password: await database.getCookiePassword(),
			isSecure: !isDev,
			clearInvalid: true,
			path: `/`,
			isHttpOnly: !isDev,
		},
		validateFunc: async (_req: Request, session: any) => {
			const { username, discriminator } = session;
			const account = await database.getAccountByUsernameDiscriminator(
				username,
				discriminator
			);

			if (!account) {
				return { valid: false };
			};
			return { valid: true, credentials: account };
		},
	});

	server.auth.default({ strategies: [ `session` ] });

	// Register all the routes
	let files = glob.sync(
		`endpoints/**/!(*.map)`,
		{ cwd: __dirname, nodir: true}
	);
	for (var file of files) {
		let route = (await import(path.join(__dirname, file))).default;
		console.log(`Registering route: ${route.method} ${route.path}`);
		server.route(route);
	};

	server.start().then(() => {
		console.log(`Server listening on ${server.info.uri}`);
	});
};

init();