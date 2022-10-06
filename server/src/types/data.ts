export interface Account {
	username: string;
	discriminator: number;
	password: string;
	salt: string;
	games: number[];
	accounts: {[index: string]: any};
	profile_picture: string | null;
}