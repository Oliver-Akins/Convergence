import { ServerRoute } from "@hapi/hapi";

const route: ServerRoute = {
	method: `GET`, path: `/internal/auth-test`,
	options: {
		isInternal: true,
	},
	async handler(_, h) {
		return h.response().code(200);
	},
};
export default route;