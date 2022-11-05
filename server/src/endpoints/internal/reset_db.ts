import { ServerRoute } from "@hapi/hapi";
import { database } from "$/main";

const route: ServerRoute = {
	method: `GET`, path: `/internal/db-reset`,
	options: {
		isInternal: true,
		auth: false,
	},
	async handler(_, h) {
		await database.reset();
		return h.response().code(200);
	},
};
export default route;