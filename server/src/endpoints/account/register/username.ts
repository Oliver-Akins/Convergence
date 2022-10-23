import { passwordSchema, usernameSchema } from "$/schemas/accounts";
import { cleanAccount } from "$/utils/data_cleaner";
import { randomString } from "@hapi/cryptiles";
import { config, database, log } from "$/main";
import { ServerRoute } from "@hapi/hapi";
import { Account } from "$/types/data";
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
		log.silly(`Attempting registeration with username: ${username}`);

		const accounts = await database.getAccountsByUsername(username);

		if (accounts.length >= config.service.same_name_account_limit) {
			throw boom.conflict(`Too many accounts with that username`);
		};

		const discriminator = accounts.length + 1;
		const salt = randomString(15);
		const hashedPass = crypto
			.createHmac(`sha256`, await database.getHashSecret())
			.update(password + `$` + salt)
			.digest(`hex`);

		const user: Account = {
			id: await database.getUnusedUUID(),
			username,
			password: hashedPass,
			discriminator,
			profile_picture: null,
			salt,
			accounts: {},
			games: {},
			relations: {
				friends: [],
				requests: [],
				blocked: []
			}
		}
		await database.addUser(user);

		log.debug(`Registration successful for: ${username}#${discriminator}`);
		return h.response(cleanAccount(user, false)).code(200);
	},
};
export default route;