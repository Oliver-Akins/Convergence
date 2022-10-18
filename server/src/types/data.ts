export interface Account {
	username: string;
	discriminator: number;
	password: string;
	salt: string;
	games: number[];
	accounts: {[index: string]: any};
	profile_picture: string | null;
}

export interface Game {
	slug: string;
	name: string;
	publisher?: string;
	cover: string | null;
	platforms: string[];
	crossplays?: number[][];
}