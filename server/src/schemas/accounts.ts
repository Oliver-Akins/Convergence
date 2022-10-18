import Joi from "joi";

export const usernameRegEx = `[A-Za-z0-9]{1,50}`;
export const discriminatorRegEx = `[0-9]+`;

/* Username/Password Information */
export const usernameSchema = Joi
	.string()
	.alphanum()
	.min(1)
	.max(50);
export const passwordSchema = Joi
	.string()
	.alphanum()
	.min(6);
export const usernameDiscrimComboSchema = Joi
	.string()
	.pattern(new RegExp(`^${usernameRegEx}#${discriminatorRegEx}$`));