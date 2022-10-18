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
			return h.response(cleanAccount(authed, false)).code(200);
		};

		let [ name, discrim ] = user.split(`.`) as [string, any];
		try {
			discrim = parseInt(discrim);
		} catch (_) {
			throw boom.badRequest(`Invalid discriminator`);
		};

		let account = await database.getAccountByUsernameDiscriminator(name, discrim);

		if (!account) {
			throw boom.notFound(`No account found with that username/discrim`);
		};

		return h.response(cleanAccount(account)).code(206);
	},
};
export default route;