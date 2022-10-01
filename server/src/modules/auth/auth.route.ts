import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  checkMatchNewPassword,
  checkMatchUpdatePassword,
} from '../../utils/helpers/validation';
import {
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  meHandler,
  registerUserHandler,
  resetPasswordHandler,
  updatePasswordHandler,
  updateProfileHandler,
} from './auth.controller';
import {
  forgotPasswordSchema,
  loginUserSchema,
  logoutUserSchema,
  meSchema,
  registerUserSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from './auth.schema';
import { verifyJWT } from './utils/jwt';

export function authRoute(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.post('/register', { schema: registerUserSchema }, registerUserHandler);
  app.post('/login', { schema: loginUserSchema }, loginUserHandler);
  app.post('/logout', { schema: logoutUserSchema }, logoutUserHandler);
  app.post(
    '/forgot-password',
    { schema: forgotPasswordSchema },
    forgotPasswordHandler
  );
  app.put(
    '/reset-password/:token',
    { schema: resetPasswordSchema, preValidation: checkMatchNewPassword },
    resetPasswordHandler
  );
  app.get(
    '/me',
    {
      schema: meSchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    meHandler
  );
  app.put(
    '/me/password-update',
    {
      schema: updatePasswordSchema,
      preValidation: checkMatchUpdatePassword,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    updatePasswordHandler
  );

  app.put(
    '/me/profile-update',
    {
      schema: updateProfileSchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    updateProfileHandler
  );

  done();
}
