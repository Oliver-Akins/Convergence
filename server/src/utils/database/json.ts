import { databaseOptions } from "$/types/config";
import { Account } from "$/types/data";
import fs from "fs";

interface data {
	users: {[index: string]: Account};
	games: any;
	platforms: any;
	meta: {
		"hash-secret"?: string;
		users: {
			count: number;
			index: number;
		};
	};
};

export class JSONDatabase {
	private data: data = {
		users: {},
		games: {},
		platforms: {},
		meta: {
			users: {
				count: 0,
				index: 0,
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

	public shutdown() {
		fs.writeFileSync(this.conf.uri, JSON.stringify(this.data));
	};
};