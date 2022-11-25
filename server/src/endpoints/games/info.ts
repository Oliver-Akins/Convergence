import { ServerRoute } from "@hapi/hapi";
import { database, log } from "$/main";
import boom from "@hapi/boom";
import Joi from "joi";

const route: ServerRoute = {
	method: `GET`, path: `/game/{game}`,
	options: {
		validate: {
			params: Joi.object({
				game: Joi.string(),
			}),
		},
	},
	async handler(request, h) {
		log.debug(`Attempting to get a game's info`);
		let { game } = request.params;

		let games = await database.getGamesBySlugs([ game ]);
		if (games.length === 0) {
			throw boom.notFound(`No game found with that slug`);
		};
		return games[0];
	},
};
export default route;