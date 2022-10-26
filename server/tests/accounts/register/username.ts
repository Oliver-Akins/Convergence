import { verifyAccount } from "../../utils";
import { describe, it, afterEach } from "mocha";
import { server } from "../../main";
import { expect } from "chai";

describe(`POST /register/username`, function() {
	const method = `POST`;
	const route = `/register/username`;

	before(async function() {
		let r = await server.inject({
			method: `GET`,
			url: `/internal/db-reset`,
			allowInternals: true,
		});
	});

	/*
	This method is here to reset the database between each test so that it can
	be done with a clean slate without needing to worry about cross contamination
	of the tests.
	*/
	afterEach(async function() {
		return await server.inject({
			method: `GET`,
			url: `/internal/db-reset`,
			allowInternals: true,
		});
	});


	it(`should 200 when provided valid username/password`, async function() {
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
		verifyAccount(account);
		expect(account.id).to.have.length(36);
		expect(account.discriminator).to.equal(1);
		expect(account.username).to.have.lengthOf(4);
	});


	it(`should 400 when username is not long enough`, async function() {
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


	it(`should 400 when password is not long enough`, async function() {
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


	it(`should 400 when the username is too long`, async function() {
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


	it(`should increase the discriminator when the username is already taken`, async function(this: Mocha.Context) {
		let r = await server.inject({
			method,
			url: route,
			payload: {
				username: "Collision",
				password: "TotallyInsecurePassword"
			}
		});
		if (r.statusCode !== 200) { return this.skip() };
		let a1 = r.result as any;

		r = await server.inject({
			method, url: route,
			payload: {
				username: "Collision",
				password: "TotallyInsecurePassword"
			}
		});
		expect(r.statusCode).to.equal(200);
		let a2 = r.result as any;
		expect(a1.username).to.equal(a2.username);
		expect(a2.discriminator).to.equal(2);
	});


	it(`shouldn't allow more users with the same name the config option`, async function(this: Mocha.Context) {
		let accountCount = 0;
		do {
			let r = await server.inject({
				method,
				url: route,
				payload: {
					username: "TooManyOfMe",
					password: "TotallyInsecurePassword"
				}
			});

			if (r.statusCode === 200) {
				accountCount++;
			};
		} while (accountCount < 3);

		let r = await server.inject({
			method, url: route,
			payload: {
				username: "TooManyOfMe",
				password: "TotallyInsecurePassword"
			}
		});
		expect(r.statusCode).to.equal(409);
	});
});