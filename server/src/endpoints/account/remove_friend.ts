import { ServerRoute } from "@hapi/hapi";
import { database } from "$/main";
import Joi from "joi";

const route: ServerRoute = {
	method: `DELETE`, path: `/users/@me/friends`,
	options: {
		validate: {
			payload: Joi.array().items(
				Joi.string().uuid()
			),
		},
	},
	async handler(req, h) {
		const users = req.payload as string[];
		await database.removeFriends(users);
		return h.response().code(204);
	},
};
export default route;