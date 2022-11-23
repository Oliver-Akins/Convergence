import { ServerRoute } from "@hapi/hapi";
import { Account } from "$/types/data";
import { database } from "$/main";
import Joi from "joi";

const route: ServerRoute = {
	method: `DELETE`, path: `/users/@me/friends/requests`,
	options: {
		validate: {
			payload: Joi.array().items(
				Joi.string().uuid()
			),
		},
	},
	async handler(req, h) {
		const users = req.payload as string[];
		const authed = req.auth.credentials as unknown as Account;
		await database.rejectFriendRequests(authed.id, users);
		return h.response().code(204);
	},
};
export default route;