import joi from 'joi';
import { ServerConfig } from '../../models/config';

const envSchema = joi
  .object({
    HOST: joi.string().ip().default('127.0.0.1'),
    PORT: joi.number().default(3001),
    API_VERSION: joi.number().default(1),
    ALLOWED_ORIGINS: joi.string().default('http://localhost:3000'),
  })
  .unknown()
  .required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const server: ServerConfig = {
  host: envVars.HOST,
  port: envVars.PORT,
  apiVersion: envVars.API_VERSION,
  origins: envVars.ALLOWED_ORIGINS.split(','),
};
