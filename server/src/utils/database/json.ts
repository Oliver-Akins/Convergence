import { databaseOptions } from "$/types/config";
import { randomString } from "@hapi/cryptiles";
import { Account, Game } from "$/types/data";
import crypto from "crypto";
import { v4 } from "uuid";
import fs from "fs";

interface data {
	users: {[index: string]: Account};
	games: {[index: string]: Game};
	platforms: any;
	meta: {
		"hash-secret"?: string;
		"cookie-password"?: string;
		used_uuids: string[],
		users: {
			count: number;
		};
		games: {
			count: number;
		};
	};
};

export class JSONDatabase {
	private data: data = {
		users: {},
		games: {},
		platforms: {},
		meta: {
			used_uuids: [],
			users: {
				count: 0,
			},
			games: {
				count: 0,
			},
		},
	};
	private conf: databaseOptions;

	constructor(conf: databaseOptions) {
		this.conf = conf;

		if (!fs.existsSync(conf.uri)) {
			console.error(`Can't find database file, creating default`);
			try {
				fs.writeFileSync(conf.uri, JSON.stringify(this.data));
			} catch (_) {
				console.log(`Couldn't create database file, ensure the uri is a valid filepath`);
			};
		};
		this.data = JSON.parse(fs.readFileSync(conf.uri, `utf-8`));
	};

	public async shutdown() {
		fs.writeFileSync(this.conf.uri, JSON.stringify(this.data));
	};

	/**
	 * Retrieves the cookie password from the database, if it exists, if it
	 * doesn't exist, it creates one then returns that instead.
	 */
	public async getCookiePassword(): Promise<string> {
		if (!this.data.meta[`cookie-password`]) {
			this.data.meta[`cookie-password`] = randomString(64);
		};
		return this.data.meta[`cookie-password`];
	};

	/**
	 * Retrieves the secret used for hashing passwords
	 */
	public async getHashSecret(): Promise<string> {
		if (!this.data.meta[`hash-secret`]) {
			this.data.meta[`hash-secret`] = randomString(15);
		};
		return this.data.meta[`hash-secret`];
	};

	/**
	 * Retrieves a UUID that hasn't been used yet and marks it as used, this is
	 * to help prevent accidental UUID collisions (even if they're incredibly
	 * unlikely).
	 */
	public async getUnusedUUID(): Promise<string> {
		let id: string;
		do {
			id = v4();
		} while (this.data.meta.used_uuids.includes(id));
		this.data.meta.used_uuids.push(id);
		return id;
	};

	/**
	 * Retrieves a user's account from the database provided their username.
	 *
	 * @param username The username of the account
	 * @returns The accounts that have that username
	 */
	public async getAccountsByUsername(username: string): Promise<Account[]> {
		let users: Account[] = [];
		for (const aid in this.data.users) {
			const account = this.data.users[aid];
			if (username == account.username) {
				users.push(account);
			};
		};
		return users;
	};

	/**
	 * Finds a specific account based on the username and the unique discriminator
	 * of the account.
	 *
	 * @param username The username of the account
	 * @param discriminator The discriminator of the account
	 * @returns The account data, if it was found.
	 */
	public async getAccountByUsernameDiscriminator(
		username: string,
		discriminator: number
	): Promise<Account | undefined> {
		for (const aid in this.data.users) {
			const account = this.data.users[aid];
			if (
				username === account.username
				&& discriminator === account.discriminator
			) {
				return account;
			};
		};
		return undefined;
	};

	/**
	 * Retrieves a user's account from the database if it exists
	 *
	 * @param id The user's ID
	 * @returns The account if it was found
	 */
	public async getAccountByID(id: string): Promise<Account | undefined> {
		return this.data.users[id];
	};

	/**
	 * Get all users that exist with the provided IDs, if one does not exist it
	 * isn't included in the result. So in order to check for completeness of
	 * the result the returned array length will need to be compared to the ID
	 * list input.
	 *
	 * @param ids The list of user IDs
	 * @returns All of the accounts that were found from the list of IDs
	 */
	public async getAccountsByIDs(ids: string[]): Promise<Account[]> {
		let accounts: Account[] = [];
		for (const id of ids) {
			const user = this.data.users[id];
			if (user) {
				accounts.push(user);
			};
		};
		return accounts;
	};

	/**
	 * Compares a provided password against the user's account, given their
	 * username, discriminator, and the password to validate.
	 *
	 * @param username The username of the account
	 * @param discrim The discriminator of the account
	 * @param password The provided password to validate
	 * @returns Whether or not the password matches the data for the account
	 */
	public async compareUserPassword(
		username: string, discrim: number,
		password: string
	) {
		const account = await this.getAccountByUsernameDiscriminator(username, discrim);
		if (!account) {
			throw new Error("No account found with that username/discriminator");
		};
		return this.comparePasswords(account, password);
	};

	/**
	 * Compares a provided password against the user's account data.
	 *
	 * @param account The account data of the user
	 * @param password The provided password of the user
	 * @returns Whether or not the passwords match
	 */
	public async comparePasswords(
		account: Account,
		password: string
	) {
		const hashedPass = crypto
			.createHmac(`sha256`, await this.getHashSecret())
			.update(password + `$` + account.salt)
			.digest();
		const storedPass = Buffer.from(account.password, `hex`);

		return crypto.timingSafeEqual(hashedPass, storedPass);
	};

	/**
	 * Adds the user into the database.
	 */
	public async addUser(user: Account) {
		this.data.users[user.id] = user;
		this.data.meta.users.count++;
	};

	/**
	 * Searches the database for games that have the query in their name.
	 *
	 * @param query The string to search the names for
	 * @returns The games that were found to contain the query
	 */
	public async searchGames(query: string): Promise<Game[]> {
		let results: Game[] = [];
		for (const gameId in this.data.games) {
			const game = this.data.games[gameId];
			if (game.name.toLowerCase().includes(query.toLowerCase())) {
				results.push(game);
			};
		};
		return results;
	};

	/**
	 * Saves a game to the database.
	 *
	 * @param game The game to save.
	 */
	public async addGame(game: Game) {
		this.data.games[game.slug] = game;
		this.data.meta.games.count++;
	};

	/**
	 * Retrieve a list of Game objects from the database given their slugs
	 *
	 * @param slugs The slugs for the games to get
	 * @returns An array of the game objects for the slugs that could be found
	 */
	public async getGamesBySlugs(slugs: string[]): Promise<Game[]> {
		return slugs
			.map(s => this.data.games[s])
			.filter(g => g != undefined);
	};

	/** @internal */
	public async reset() {
		this.data.games = {};
		this.data.users = {};
		this.data.platforms = {};
		this.data.meta = {
			used_uuids: [],
			users: {
				count: 0,
			},
			games: {
				count: 0,
			},
		};
	};
};