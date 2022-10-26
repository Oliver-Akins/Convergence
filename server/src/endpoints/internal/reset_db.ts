import { ServerRoute } from "@hapi/hapi";
import { database } from "$/main";

const route: ServerRoute = {
	method: `GET`, path: `/internal/db-reset`,
	options: {
		isInternal: true,
	},
	async handler(_, h) {
		console.log(`Resetting DB`)
		await database.reset();
		return h.response().code(200);
	},
};
export default route;