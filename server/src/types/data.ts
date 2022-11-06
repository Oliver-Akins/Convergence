export interface Account {
	id: string;
	username: string;
	discriminator: number;
	password: string;
	salt: string;
	games: {[index: string]: string[]};
	accounts: {[index: string]: any};
	profile_picture: string | null;
	relations: {
		friends: string[];
		requests: string[];
		blocked: string[];
	};
}

export interface Game {
	slug: string;
	name: string;
	publisher?: string;
	cover: string | null;
	platforms: string[];
	crossplays?: string[][];
}