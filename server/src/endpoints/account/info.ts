import { cleanAccount } from "$/utils/data_cleaner";
import { ServerRoute } from "@hapi/hapi";
import { Account } from "$/types/data";
import { database } from "$/main";
import boom from "@hapi/boom";
import Joi from "joi";

const route: ServerRoute = {
	method: `GET`, path: `/users/{user}`,
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
			return h.response(cleanAccount(authed, false, false)).code(200);
		};

		let account = await database.getAccountByID(user);

		if (!account) {
			throw boom.notFound(`No account found with that username/discrim`);
		};

		return h.response(cleanAccount(
			account,
			true,
			!authed.relations.friends.includes(user))
		).code(206);
	},
};
export default route;