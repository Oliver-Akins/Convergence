import { ServerRoute } from "@hapi/hapi";
import { database, log } from "$/main";
import { Account } from "$/types/data";
import boom from "@hapi/boom";
import Joi from "joi";

interface response {
	successes: string[];
	errors: string[];
}

const route: ServerRoute = {
	method: [`POST`, `PUT`, `PATCH`], path: `/users/@me/games`,
	options: {
		validate: {
			payload: Joi.object().pattern(
				/[A-Za-z0-9\-]+/,
				Joi.array().items(Joi.string()).allow(null)
			),
		},
	},
	async handler(request, h) {
		log.debug(`Updating a user's game list`);
		const account = request.auth.credentials as unknown as Account;
		const gamesToAdd = request.payload as any;

		let response: response = {
			successes: [],
			errors: [],
		};

		for (const slug in gamesToAdd) {
			if (!(await database.isValidGame(slug))) {
				response.errors.push(`${slug} - No game exists with that slug`);
				continue;
			};

			// It's an array of platforms, so save/update the data
			if (gamesToAdd[slug] != null) {
				let inOwned = account.games[slug] != null;
				account.games[slug] = gamesToAdd[slug];
				response.successes.push(
					`${slug} - ${inOwned ? `Updated` : `Added to`} owned games`
				);
			}

			// Set to null, so we're deleting the game data
			else {
				delete account.games[slug];
				response.successes.push(`${slug} - Deleted game ownership`);
			};
		};

		return response;
	},
};
export default route;