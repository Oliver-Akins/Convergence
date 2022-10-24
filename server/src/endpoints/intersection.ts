import { database, log } from "$/main";
import { Account } from "$/types/data";
import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";

const route: ServerRoute = {
	method: `GET`, path: `/intersection`,
	options: {
		validate: {
			query: Joi.object({
				users: Joi.string(),
				"@me": Joi.boolean().default(true),
			}),
		},
	},
	async handler(request, h) {
		/*
		0. Get all of the users
		1. Find user with the fewest owned games, set the "shared_games" equal to that
		2. For each other user:
			2.1 For each game the user owns:
				2.1.1 Check if the platform that the previous users own it on is compatible
					with the platform this user owns it on
				2.1.2 If the platforms do not have crossplay compatibility, remove the
					game from the "shared_games" data
				2.1.2 If the platform the current user owns it on is not already in the
					platform data from the previous users, add it to the platform data
		3. Return the "shared_games"
		*/
		log.debug(`Comparing user game libraries`);

		// 0
		const account = request.auth.credentials as unknown as Account;
		let userIDs: string[] = request.query.users.split(`,`)
			.filter((u: string) => account.relations.friends.includes(u));
		let users: Account[] = await database.getAccountsByIDs(userIDs);
		if (request.query["@me"]) {
			log.silly(`Adding the authenticated user to the comparison list`);
			users.push(account);
			userIDs.push(account.id);
		};
		log.debug(`Comparing libraries of ${users.length} users`);

		// 1
		let leastOwned: Account|null = null;
		let lowestCount = -1;
		for (const user of users) {
			let count: number = Object.keys(user.games).length;
			if (
				leastOwned == null
				|| count < lowestCount
			) {
				leastOwned = user;
				lowestCount = count;
			};
		};

		if (leastOwned == null || lowestCount <= 0) {
			log.debug(`Smallest library doesn't exist, so shortcut the algorithm`);
			return h.response([]).code(204);
		};

		let ownedGames = await database.getGamesBySlugs(Object.keys(leastOwned.games));

		// 2
		users = users.filter(u => u.id != leastOwned!.id);
		for (const user of users) {
			ownedGames = ownedGames.filter(g => user.games[g.slug] != undefined);
		};

		log.debug(`Found ${ownedGames.length} shared games`);
		return h
			.response({
				users: userIDs,
				games: ownedGames,
			})
			.code(ownedGames.length > 0 ? 200 : 204);
	},
};
export default route;