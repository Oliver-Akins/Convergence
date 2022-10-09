import { Account } from "$/types/data";
import rfdc from "rfdc";

const clone = rfdc({ proto: true });

/**
 * Removes all of the sensitive properties from the Account object. This deep
 * clones the object before cleaning it to prevent unintentional data removal.
 *
 * @param user The user data to clean up
 * @returns The cleaned up account object
 */
export function cleanAccount(user: Account, accounts=true): Partial<Account> {
	let cloned: Partial<Account> = clone(user);
	delete cloned.password;
	delete cloned.salt;
	if (accounts)
		delete cloned.accounts;
	return cloned;
};