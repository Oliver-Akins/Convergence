import { passwordSchema, usernameDiscrimComboSchema } from "$/schemas/accounts";
import { ServerRoute } from "@hapi/hapi";
import { database, log } from "$/main";
import boom from "@hapi/boom";
import crypto from "crypto";
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

		const account = await database.getAccountByUsernameDiscriminator(username, discriminator);
		if (!account) {
			throw boom.badRequest(`No account found with that username`);
		};

		const hashedPass = crypto
			.createHmac(`sha256`, await database.getHashSecret())
			.update(pass + `$` + account.salt)
			.digest();
		const storedPass = Buffer.from(account.password, `hex`);
		const valid = crypto.timingSafeEqual(hashedPass, storedPass);

		if (!valid) {
			log.debug(`Login attempt failed for: ${user}`);
			throw boom.badRequest();
		};

		log.debug(`Login successful for: ${user}`);
		req.cookieAuth.set({
			username: username,
			discriminator: account.discriminator,
		});
		return h.response().code(200);
	},
};
export default route;