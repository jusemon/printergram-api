import joi from 'joi';
import { TelegramConfig } from '../../models/config';

const envSchema = joi
  .object({
    TG_API_ID: joi.number(),
    TG_API_HASH: joi.string(),
  })
  .unknown()
  .required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const telegram: TelegramConfig = {
  apiId: envVars.TG_API_ID,
  apiHash: envVars.TG_API_HASH,
};
