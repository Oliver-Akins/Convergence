import { passwordSchema, usernameSchema } from "$/schemas/accounts";
import { randomString } from "@hapi/cryptiles";
import { ServerRoute } from "@hapi/hapi";
import { config, database, log } from "$/main";
import boom from "@hapi/boom";
import crypto from "crypto";
import Joi from "joi";

const route: ServerRoute = {
	method: `POST`, path: `/register/username`,
	options: {
		auth: false,
		validate: {
			payload: Joi.object({
				username: usernameSchema,
				password: passwordSchema,
			}),
		},
	},
	async handler(req, h) {
		let { username, password} = req.payload as any;
		log.silly(`Registration with username: ${username}`);

		const accounts = database.getAccountsByUsername(username);

		if (accounts.length >= config.service.same_name_account_limit) {
			throw boom.conflict(`Too many accounts with that username`);
		};

		const discriminator = accounts.length + 1;
		const salt = randomString(15);
		const hashedPass = crypto
			.createHmac(`sha256`, database.getHashSecret())
			.update(password + `$` + salt)
			.digest(`hex`);
		log.silly(`hashed length: ${hashedPass.length}`);

		database.addUser({
			username,
			password: hashedPass,
			discriminator,
			profile_picture: null,
			salt,
			accounts: {},
			games: [],
		});

		log.debug(`Registration successful for: ${username}#${discriminator}`);
		return h.response().code(200);
	},
};
export default route;