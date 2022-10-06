import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { verifyJWT } from '../auth/utils/jwt';
import {
  processPaymentHandler,
  sendStripeApiKeyHandler,
} from './payment.controller';
import { getStripeApiKeySchema, processPaymentSchema } from './payment.schema';

export function paymentRoute(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.post(
    '/process',
    {
      schema: processPaymentSchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    processPaymentHandler
  );

  app.get(
    '/stripeapikey',
    {
      schema: getStripeApiKeySchema,
      preHandler: [
        async (request, reply, done) => verifyJWT(request, reply, done),
      ],
    },
    sendStripeApiKeyHandler
  );

  done();
}
