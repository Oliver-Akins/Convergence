import { friendAccount } from "$/utils/data_cleaner";
import { ServerRoute } from "@hapi/hapi";
import { Account } from "$/types/data";
import { database } from "$/main";
import boom from "@hapi/boom";
import Joi from "joi";

const route: ServerRoute = {
	method: `GET`, path: `/users/{user}/friends`,
	options: {
		validate: {
			params: Joi.object({
				user: Joi.string().uuid().allow(`@me`),
			}),
		},
	},
	async handler(req, h) {
		const { user } = req.params;
		const authed = req.auth.credentials as unknown as Account;

		if (
			user === `@me`
			|| user === authed.id
		) {
			let friends = await database.getAccountsByIDs(authed.relations.friends);
			return h.response(friends.map(f => friendAccount(f))).code(200);
		};

		if (!authed.relations.friends.includes(user)) {
			throw boom.forbidden(`Can't see the friends list of a user you aren't friends with`);
		};

		let account = await database.getAccountByID(user);
		if (!account) {
			throw boom.notFound(`No account found with that username/discrim`);
		};

		return h.response(account.relations.friends).code(206);
	},
};
export default route;