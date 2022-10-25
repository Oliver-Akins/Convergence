import { expect } from "chai";

export function verifyAccount(account: object, removeKeys: string[] = []) {
	let keys = [
		`id`,
		`username`,
		`discriminator`,
		`profile_picture`,
		`accounts`,
		`games`,
		`relations`
	];
	expect(account).to.be.an("object").and.have.all.keys(
		keys.filter(k => !removeKeys.includes(k))
	);
};