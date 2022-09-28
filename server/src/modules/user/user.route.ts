import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { validateMongoId } from '../../utils/helpers/validation';
import { verifyJWT } from '../auth/utils/jwt';
import { authorizeRoles, ROLES } from '../auth/utils/role';
import {
  deleteUserHandler,
  getAllUsersHandler,
  getSingleUserHandler,
  updateUserRoleHandler,
} from './user.controller';
import {
  deleteUserSchema,
  getAllUsersSchema,
  getSingleUserSchema,
  updateUserRoleSchema,
} from './user.schema';

export function userRoute(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.get(
    '/',
    {
      schema: getAllUsersSchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES['ADMIN']]),
      ],
    },
    getAllUsersHandler
  );
  app.get(
    '/:id',
    {
      schema: getSingleUserSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES['ADMIN']]),
      ],
    },
    getSingleUserHandler
  );
  app.put(
    '/:id',
    {
      schema: updateUserRoleSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES['ADMIN']]),
      ],
    },
    updateUserRoleHandler
  );
  app.delete(
    '/:id',
    {
      schema: deleteUserSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES['ADMIN']]),
      ],
    },
    deleteUserHandler
  );
  done();
}
