import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { validateMongoId } from '../../utils/helpers/validation';
import { verifyJWT } from '../auth/utils/jwt';
import { authorizeRoles, ROLES } from '../auth/utils/role';
import {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersByAdminHandler,
  getAllOrdersByUserHandler,
  getSingleOrderHandler,
  updateOrderStatusHandler,
} from './order.controller';
import {
  createOrderSchema,
  deleteOrderSchema,
  getAllOrdersByAdminSchema,
  getAllOrdersByUserSchema,
  getSingleOrderSchema,
  updateOrderStatusSchema,
} from './order.schema';

export function orderRoute(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.post(
    '/',
    {
      schema: createOrderSchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    createOrderHandler
  );

  app.get(
    '/:id',
    {
      schema: getSingleOrderSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    getSingleOrderHandler
  );

  app.get(
    '/me',
    {
      schema: getAllOrdersByUserSchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    getAllOrdersByUserHandler
  );

  app.get(
    '/',
    {
      schema: getAllOrdersByAdminSchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES.ADMIN]),
      ],
    },
    getAllOrdersByAdminHandler
  );

  app.put(
    '/:id',
    {
      schema: updateOrderStatusSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES.ADMIN]),
      ],
    },
    updateOrderStatusHandler
  );

  app.delete(
    '/:id',
    {
      schema: deleteOrderSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES.ADMIN]),
      ],
    },
    deleteOrderHandler
  );

  done();
}
