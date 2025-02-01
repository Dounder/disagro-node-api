import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').default('3000').asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  DATABASE_URL: get('DATABASE_URL').default('public').asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  APP_URL: get('APP_URL').required().asString()
};
