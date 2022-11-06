import { Account } from "$/types/data";
import rfdc from "rfdc";

const clone = rfdc({ proto: true });

/**
 * Removes all of the sensitive properties from the Account object. This deep
 * clones the object before cleaning it to prevent unintentional data removal.
 *
 * @param user The user data to clean up
 * @param accounts Whether or not to remove the linked account data
 * @param games Whether or not to remove the games data
 * @returns The cleaned up account object
 */
export function cleanAccount(
	user: Account,
	accounts = true,
	games = true
): Partial<Account> {
	let cloned: Partial<Account> = clone(user);
	delete cloned.password;
	delete cloned.salt;
	if (accounts)
		delete cloned.accounts;
	if (games)
		delete cloned.games;
	return cloned;
};

/**
 * Cleans a user object to be able to return it as the friend information
 *
 * @param user The user data to purge properties from
 * @returns The user data minus all the properties that friends don't need to know
 */
export function friendAccount(user: Account): Partial<Account> {
	let cleaned = cleanAccount(user, true, true);
	delete cleaned.relations;
	return cleaned;
};