import { describe, it } from "mocha";
import { expect } from "chai";
import { server } from "../../main";

describe(`POST /register/username`, () => {
	const method = `POST`;
	const route = `/register/username`;

	it(`should 200 when provided valid username/password`, async () => {
		let r = await server.inject({
			method,
			url: route,
			payload: {
				username: "Test",
				password: "CompletelyInsecurePassword"
			}
		});
		expect(r.statusCode).to.equal(200);
		let account = r.result as any;
		expect(account).to.be.an("object").that.has.all.keys([
			`id`,
			`username`,
			`discriminator`,
			`profile_picture`,
			`accounts`,
			`games`,
			`relations`
		]);
		expect(account.id).to.have.length(36);
		expect(account.discriminator).to.equal(1);
		expect(account.username).to.have.lengthOf(4);
	});

	it(`should 400 when username is not long enough`, async () => {
		let r = await server.inject({
			method,
			url: route,
			payload: {
				username: "",
				password: "CompletelyInsecurePassword"
			}
		});
		expect(r.statusCode).to.equal(400);
	});

	it(`should 400 when password is not long enough`, async () => {
		let r = await server.inject({
			method,
			url: route,
			payload: {
				username: "Test",
				password: ""
			}
		});
		expect(r.statusCode).to.equal(400);
	});

	it(`should 400 when the username is too long`, async () => {
		let r = await server.inject({
			method,
			url: route,
			payload: {
				username: "ThisIsALongUsernameThisIsALongUsernameThisIsALongUsername",
				password: "TotallyInsecurePassword"
			}
		});
		expect(r.statusCode).to.equal(400);
	});
});