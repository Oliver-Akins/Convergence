import { usernameDiscrimComboSchema } from "$/schemas/accounts";
import { ServerRoute } from "@hapi/hapi";
import { Account } from "$/types/data";
import { database, log } from "$/main";
import Joi from "joi";

const route: ServerRoute = {
	method: [`PUT`, `POST`], path: `/users/@me/friends`,
	options: {
		validate: {
			payload: Joi.array().items(
				Joi.alternatives(
					Joi.string().uuid(),
					usernameDiscrimComboSchema
				)
			),
		},
	},
	async handler(req, h) {
		const users = req.payload as string[];
		const authed = req.auth.credentials as unknown as Account;
		log.info(`Attempting to add ${users.length} friends for ${authed.username}#${authed.discriminator}`);

		let accepted: string[] = [];
		let sent: string[] = [];
		let errored: string[] = [];

		for (const user of users) {

			let uid = user;
			let other = null;


			// It was a username provided, try to convert it to an user ID so
			// that we have it exact
			if (user.includes(`#`)) {
				log.debug(`Trying to parse out the username/discrim`)
				let [ username, discrim ] = user.split(`#`) as [string, any];
				try {
					discrim = parseInt(discrim);
				} catch (e) {
					errored.push(user);
				};
				other = await database.getAccountByUsernameDiscriminator(username, discrim);
				if (other) {
					uid = other.id;
				};
			};

			if (authed.relations.friends.includes(uid)) {
				errored.push(uid);
			}
			else if (authed.relations.requests.includes(uid)) {
				await database.acceptFriendRequest(authed.id, uid);
				accepted.push(uid);
			}
			else {
				if (!other) {
					other = await database.getAccountByID(uid);
				};

				if (!other || other.relations.blocked.includes(authed.id)) {
					errored.push(uid);
				}
				else {
					await database.sendFriendRequest(authed.id, uid);
					sent.push(uid);
				};
			};
		};

		return h.response({ accepted, sent, errored });
	},
};
export default route;