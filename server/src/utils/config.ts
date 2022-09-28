import { envSchema } from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  PORT: Type.Number({
    default: 4000,
  }),
  HOST: Type.String({
    default: '0.0.0.0',
  }),
  DATABASE_URL: Type.String(),
  JWT_SECRET: Type.String(),
  JWT_EXPIRES: Type.String(),
  COOKIE_SECRET: Type.String(),
  SMPT_SERVICE: Type.String(),
  SMPT_MAIL: Type.String(),
  SMPT_PASSWORD: Type.String(),
  SMPT_HOST: Type.String(),
  SMPT_PORT: Type.Number(),
});

type Env = Static<typeof schema>;

export const config = envSchema<Env>({
  schema,
  dotenv: true,
});
