import { ServerRoute } from "@hapi/hapi";

const route: ServerRoute = {
	method: `GET`, path: `/{path*}`,
	options: {
		auth: false,
	},
	handler: {
		directory: {
			path: '.',
			redirectToSlash: true,
			index: true,
		},
	}
};
export default route;