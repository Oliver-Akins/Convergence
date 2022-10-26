import { database } from "$/main";

export async function cleanExit() {
	await database.shutdown();
	process.exit(0);
};