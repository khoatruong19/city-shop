import { envSchema } from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

export const __prod__ = process.env.NODE_ENV === 'production';

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
  CLOUDINARY_CLOUD_NAME: Type.String(),
  CLOUDINARY_API_KEY: Type.String(),
  CLOUDINARY_API_SECRET: Type.String(),
  STRIPE_SECRET_KEY: Type.String(),
  STRIPE_API_KEY: Type.String(),
  ...(__prod__
    ? { CORS_ORIGIN_PROD: Type.String() }
    : { CORS_ORIGIN_DEV: Type.String() }),
});

type Env = Static<typeof schema>;

export const config = envSchema<Env>({
  schema,
  dotenv: true,
});
