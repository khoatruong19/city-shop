import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  createProductHandler,
  createProductReviewHandler,
  deleteProductHandler,
  deleteProductReviewHandler,
  getAllProductsByAdminHandler,
  getAllProductsHandler,
  getProductDetailHandler,
  getSingleProductReviewsHandler,
  updateProductHandler,
} from './product.controller';
import {
  createProductReviewSchema,
  createProductSchema,
  deleteProductReviewSchema,
  deleteProductSchema,
  getAllProductsByAdminSchema,
  getAllProductsSchema,
  getProductDetailSchema,
  getSingleProductReviewsSchema,
  updateProductSchema,
} from './product.schema';
import { verifyJWT } from '../auth/utils/jwt';
import { authorizeRoles, ROLES } from '../auth/utils/role';
import { validateMongoId } from '../../utils/helpers/validation';

export function productRoute(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.get(
    '/',
    {
      schema: getAllProductsSchema,
    },
    getAllProductsHandler
  );
  app.get(
    '/admin',
    {
      schema: getAllProductsByAdminSchema,
    },
    getAllProductsByAdminHandler
  );
  app.get(
    '/:id',
    {
      schema: getProductDetailSchema,
      preValidation: validateMongoId,
    },
    getProductDetailHandler
  );
  app.post(
    '/',
    {
      schema: createProductSchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES['ADMIN']]),
      ],
    },
    createProductHandler
  );
  app.patch(
    '/:id',
    {
      schema: updateProductSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES['ADMIN']]),
      ],
    },
    updateProductHandler
  );
  app.delete(
    '/:id',
    {
      schema: deleteProductSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
        authorizeRoles([ROLES['ADMIN']]),
      ],
    },
    deleteProductHandler
  );
  app.post(
    '/:id/reviews',
    {
      schema: createProductReviewSchema,
      preValidation: validateMongoId,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    createProductReviewHandler
  );

  app.get(
    '/:id/reviews',
    {
      schema: getSingleProductReviewsSchema,
      preValidation: validateMongoId,
    },
    getSingleProductReviewsHandler
  );

  app.delete(
    '/:id/reviews',
    {
      schema: deleteProductReviewSchema,
      preValidation: validateMongoId,
    },
    deleteProductReviewHandler
  );

  done();
}
