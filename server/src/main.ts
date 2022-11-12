// Filepath aliasing to avoid relative-imports whenever possible, this must stay
// at the top of this file as the first statement
import "module-alias/register";

import { JSONDatabase } from "./utils/database/json";
import { Request, Server } from "@hapi/hapi";
import { loadConfig } from "./utils/config";
import cookie from "@hapi/cookie";
import inert from "@hapi/inert";
import basic from "@hapi/basic";
import { Logger } from "tslog";
import boom, { isBoom } from "@hapi/boom";
import path from "path";
import glob from "glob";


export const isDev = process.env.NODE_ENV?.startsWith(`dev`);

/*
Loading the config, if the server is being tested we want to override some of
the config options to prevent the system from needing to send huge numbers of
requests in order to properly test things.
*/
export const config = loadConfig();
if (process.env.TESTING === `true`) {
	config.service.same_name_account_limit = 3;
};

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


export async function init() {

	const server = new Server({
		port: config.server.port,
		routes: {
			files: {
				relativeTo: path.join(__dirname, `../site`),
			},
			cors: !isDev,
			validate: {
				options: {
					abortEarly: false,
				},
				failAction(r, h, err) {
					throw err;
				},
			},
		},
	});

	/*
	This event listener makes it so that the error that is returned from the system
	is more user-friendly when it's a validation error, and so that nothing gets
	leaked accidentally through allowing other data to make it out of the API.
	*/
	server.ext(`onPreResponse`, (req, h) => {

		if (isBoom(req.response)) {
			log.info(req.response)
			let oldResponse = req.response.output.payload as any;
			let newResponse: any = {
				statusCode: oldResponse.statusCode,
				error: oldResponse.error,
				message: oldResponse.message,
			};

			let deets = (req.response as any).details as any[];
			if (deets) {
				let messages = deets.map(e => e.message);
				newResponse.message = (req.response as any).output.payload.validation.source + ` failed to validate`;
				newResponse.violations = messages;
			};

			req.response.output.payload = newResponse;
			return h.continue;
		}

		return h.continue;
	});

	await server.register([inert, cookie, basic]);

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
			const { id } = session;
			const account = await database.getAccountByID(id);

			if (!account) {
				return { valid: false };
			};
			return { valid: true, credentials: account };
		},
	});

	/*
	This authentication strategy is primarily for easier script writing that
	uses the API, it allows requests using BASIC auth to be authenticated
	properly. The username for the authentication MUST contain both the username
	and the discriminator of the user, in the format "username#discriminator",
	if either of the values are not provided, authorization will fail.
	*/
	server.auth.strategy(`basic`, `basic`, {
		async validate(_request: Request, id: string, password: string) {
			const account = await database.getAccountByID(id);
			if (!account) {
				throw boom.unauthorized();
			};

			return {
				isValid: await database.comparePasswords(account, password),
				credentials: account,
			};
		},
	});

	server.auth.default({ strategies: [ `session`, `basic` ] });

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

	if (isDev) {
		server.route({
			method: `GET`, path: `/docs/{path*}`,
			options: {
				auth: false,
				files: {
					relativeTo: path.join(__dirname, `../docs`)
				},
			},
			handler: {
				directory: {
					path: `.`,
					index: true,
					redirectToSlash: true,
				}
			}
		});
		console.log(`Documentation available on /docs`);
	};

	return server;
};

async function start() {
	const server = await init();
	server.start().then(() => {
		console.log(`Server listening on ${server.info.uri}`);
	});
};

if (require.main == module) {
	start();
};