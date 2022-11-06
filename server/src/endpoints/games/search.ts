import { ServerRoute } from "@hapi/hapi";
import { RAWG } from "$/utils/apis/RAWG";
import { database, log } from "$/main";
import { Game } from "$/types/data";
import Joi from "joi";

const route: ServerRoute = {
	method: `GET`, path: `/games/search`,
	options: {
		validate: {
			query: Joi.object({
				query: Joi.string().min(1),
			}),
		},
	},
	async handler(req, h) {
		let { query } = req.query;
		log.silly(`Performing search with query: ${query}`);
		let results: Game[] = await database.searchGames(query);

		/*
		When the database we have doesn't have enough results from the search,
		we want to add more results from IGDB to make sure that the user can
		choose the game they want to add, even if we don't have the information
		about it within the system already.
		*/
		if (results.length < 15) {
			let igdbr = await RAWG.searchGames(query);
			for (const game of igdbr) {
				if (!results.find(g => g.name == game.name)) {
					await database.addGame(game);
					results.push(game);
				};
			};
			log.debug(`Database didn't have enough results for search, supplemented with RAWG search`);
		};
		return results;
	},
};
export default route;