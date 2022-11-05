import { ServerRoute } from "@hapi/hapi";
import { Account } from "$/types/data";
import { database } from "$/main";
import Joi from "joi";

const route: ServerRoute = {
	method: [`PUT`, `POST`], path: `/users/@me/friends`,
	options: {
		validate: {
			payload: Joi.array().items(Joi.string().uuid()),
		},
	},
	async handler(req, h) {
		const users = req.payload as string[];
		const authed = req.auth.credentials as unknown as Account;

		let accepted: string[] = [];
		let sent: string[] = [];
		let errored: string[] = [];

		for (const user of users) {
			if (authed.relations.friends.includes(user)) {
				errored.push(user);
			}
			else if (authed.relations.requests.includes(user)) {
				await database.acceptFriendRequest(authed.id, user);
				accepted.push(user);
			}
			else {
				let other = await database.getAccountByID(user);
				if (!other) {
					errored.push(user);
				}
				else if (other.relations.blocked.includes(authed.id)) {
					errored.push(user);
				}
				else {
					await database.sendFriendRequest(authed.id, user);
					sent.push(user);
				};
			};
		};

		return h.response({ accepted, sent, errored });
	},
};
export default route;