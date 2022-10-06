import { FastifyReply, FastifyRequest } from 'fastify';
import Stripe from 'stripe';
import { config } from '../../utils/config';
import { ApiError } from '../../utils/helpers/error';
import { logger } from '../../utils/logger';
import { PaymentBody } from './payment.schema';

export async function processPaymentHandler(
  request: FastifyRequest<{
    Body: PaymentBody;
  }>,
  reply: FastifyReply
) {
  try {
    const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
    const myPayment = await stripe.paymentIntents.create({
      amount: request.body.amount,
      currency: 'usd',
      metadata: {
        company: 'MERN',
      },
    });

    reply.send({
      message: 'Payment proceeded!',
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    logger.info(`Proceed payment error, ${error}`);
    throw new ApiError(404, 'Proceed payment error').getErrorObject(reply);
  }
}

export async function sendStripeApiKeyHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    reply.send({
      message: 'Get stripe api key!',
      stripeApiKey: config.STRIPE_API_KEY,
    });
  } catch (error) {
    logger.info(`Get stripe api key error, ${error}`);
    throw new ApiError(404, 'Get stripe api key error').getErrorObject(reply);
  }
}
