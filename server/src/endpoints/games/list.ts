import { ServerRoute } from "@hapi/hapi";
import { database, log } from "$/main";
import { Account } from "$/types/data";
import boom from "@hapi/boom";
import Joi from "joi";

const route: ServerRoute = {
	method: `GET`, path: `/users/{user}/games`,
	options: {
		validate: {
			params: Joi.object({
				user: Joi.string().uuid().allow(`@me`),
			}),
		},
	},
	async handler(request, h) {
		log.debug(`Attempting to get a games list`);
		let { user } = request.params;
		const account = request.auth.credentials as unknown as Account;

		if (
			user === `@me`
			|| user === account.id
		) {
			log.silly(`Retrieved game list for authenticated user`);
			return account.games;
		};

		if (!account.relations.friends.includes(user)) {
			log.warn(`${account.id}(${account.username}#${account.discriminator}) attempted to get game collection for a non-friend`);
			throw boom.forbidden(`Must be friends with a user before you can see their game collection`);
		};

		let friend = await database.getAccountByID(user);
		if (!friend) {
			log.silly(`Couldn't find user with ID: ${user}`);
			throw boom.notFound(`No user found with that ID`);
		};

		return friend.games;
	},
};
export default route;