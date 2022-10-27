import { verifyAccount } from "../../utils";
import { describe, it } from "mocha";
import { server } from "../../main";
import { expect } from "chai";

describe.only(`POST /login/username`, () => {
	const method = `POST`;
	const route = `/login/username`;

	const user = `test-username`;
	const pass = `DefinitelyNotSecurePassword`
	var discrim: number|null = null;
	var uid: string|null = null;

	before(async function() {
		let r = await server.inject({
			method: `POST`,
			url: `/register/username`,
			payload: {
				username: user,
				password: pass,
			},
		});

		if (r.statusCode == 200) {
			let account = r.result as any;
			uid = account.id;
			discrim = account.discriminator;
		};
	});

	/*
	This method is here to reset the database after all of the tests to prevent
	test cross-contamination.
	*/
	after(async function() {
		await server.inject({
			method: `GET`,
			url: `/internal/db-reset`,
			allowInternals: true,
		});
	});


	it(`should 200 when provided valid username/password for the account`, async function() {
		if (uid == null) { return this.skip() };

		let r = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `${user}#${discrim}`,
				password: pass
			}
		});
		expect(r.statusCode).to.equal(200);
		let account = r.result as any;
		verifyAccount(account);
		expect(account.username).to.equal(user);
		expect(account.discriminator).to.equal(discrim);
	});


	it(`shouldn't allow invalid passwords`, async function() {
		if (uid == null) { return this.skip() };

		let r = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `${user}#${discrim}`,
				password: pass + `MakeItInvalid`
			}
		});
		expect(r.statusCode).to.equal(400);
	});


	it(`shouldn't work if the discrim isn't provided`, async function() {
		if (uid == null) { return this.skip() };

		let r = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `${user}#`,
				password: pass,
			}
		});
		expect(r.statusCode).to.equal(400);
	});


	it(`shouldn't work if the username isn't provided`, async function() {
		if (uid == null) { return this.skip() };

		let r = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `#${discrim}`,
				password: pass,
			}
		});
		expect(r.statusCode).to.equal(400);
	});


	it(`shouldn't work if the username and discrim aren't provided`, async function() {
		if (uid == null) { return this.skip() };

		let r = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `#`,
				password: pass,
			}
		});
		expect(r.statusCode).to.equal(400);
	});


	it(`shouldn't work if the username is blank`, async function() {
		if (uid == null) { return this.skip() };

		let r = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: ``,
				password: pass,
			}
		});
		expect(r.statusCode).to.equal(400);
	});


	it(`shouldn't work if the password is blank`, async function() {
		if (uid == null) { return this.skip() };

		let r = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `${user}#${discrim}`,
				password: ``,
			}
		});
		expect(r.statusCode).to.equal(400);
	});

	it(`shouldn't work if the user doesn't exist`, async function() {
		if (uid == null) { return this.skip() };

		let r = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `Invalid${user}#${discrim}`,
				password: pass,
			}
		});
		expect(r.statusCode).to.equal(400);
	});

	it(`should return the same error data if the username is wrong, or if the password is wrong`, async function() {
		if (uid == null) { return this.skip() };

		let r1 = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `Invalid${user}#${discrim}`,
				password: pass,
			}
		});
		let r2 = await server.inject({
			method: `POST`,
			url: `/login/username`,
			payload: {
				username: `${user}#${discrim}`,
				password: `Invalid`+pass,
			}
		});
		expect(r1.statusCode).to.equal(r2.statusCode);
		let e1 = r1.result as any;
		let e2 = r2.result as any;
		expect(e1.error).to.equal(e2.error);
		expect(e1.message).to.equal(e2.message);
	});
});