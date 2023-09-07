import joi from 'joi';
import { Config } from '../../models/config';
import { server } from './server.config';
import { telegram } from './telegram.config';

const envSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow('development', 'production', 'test')
      .required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const general: Config = {
  env: envVars.NODE_ENV,
  isDevelopment: envVars.NODE_ENV === 'development',
  server,
  telegram,
};
