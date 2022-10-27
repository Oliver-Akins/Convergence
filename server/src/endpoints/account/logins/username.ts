import { passwordSchema, usernameDiscrimComboSchema } from "$/schemas/accounts";
import { cleanAccount } from "$/utils/data_cleaner";
import { ServerRoute } from "@hapi/hapi";
import { database, log } from "$/main";
import boom from "@hapi/boom";
import Joi from "joi";

const route: ServerRoute = {
	method: `POST`, path: `/login/username`,
	options: {
		auth: false,
		validate: {
			payload: Joi.object({
				username: usernameDiscrimComboSchema,
				password: passwordSchema,
			}),
		},
	},
	async handler(req, h) {
		let { username: user, password: pass } = req.payload as any;
		log.silly(`Login attempt for: ${user}`);

		let [ username, discriminator ] = user.split(`#`);

		try {
			discriminator = parseInt(discriminator);
		} catch (_) {
			throw boom.badRequest(`Provided discriminator is not a number`);
		};

		let account = await database.getAccountByUsernameDiscriminator(username, discriminator);

		if (!account) {
			throw boom.badRequest();
		};

		let valid: boolean = false;
		try {
			valid = await database.comparePasswords(account, pass);
		} catch (_) {};

		if (!valid) {
			log.debug(`Login attempt failed for: ${user}`);
			throw boom.badRequest();
		};

		log.debug(`Login successful for: ${user}`);
		req.cookieAuth.set({ id: account.id, username, discriminator, });
		return h.response(cleanAccount(account, false, false)).code(200);
	},
};
export default route;