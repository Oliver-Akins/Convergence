import { passwordSchema, usernameDiscrimComboSchema } from "$/schemas/accounts";
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

		let valid: boolean = false;
		try {
			valid = await database.compareUserPassword(username, discriminator, pass);
		} catch (_) {
			throw boom.badRequest();
		};

		if (!valid) {
			log.debug(`Login attempt failed for: ${user}`);
			throw boom.badRequest();
		};

		log.debug(`Login successful for: ${user}`);
		req.cookieAuth.set({ username, discriminator, });
		return h.response().code(200);
	},
};
export default route;