import Joi from "joi";

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
	.pattern(/^[A-Za-z0-9#]{1,50}$/);