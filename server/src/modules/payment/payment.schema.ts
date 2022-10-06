import { Static, Type } from '@sinclair/typebox';

const paymentResponseSuccess = Type.Object({
  message: Type.String(),
  client_secret: Type.String(),
});

const getStripeApiKeySuccess = Type.Object({
  message: Type.String(),
  stripeApiKey: Type.String(),
});

const paymentResponseFail = Type.Object({
  message: Type.String(),
  error: Type.String(),
});

export const processPaymentSchema = {
  tags: ['payment'],
  description: 'Proceed payment!',
  body: Type.Object({
    amount: Type.Number(),
  }),
  response: {
    200: paymentResponseSuccess,
    400: paymentResponseFail,
  },
};

export const getStripeApiKeySchema = {
  tags: ['payment'],
  description: 'Api stripe key!',
  response: {
    200: getStripeApiKeySuccess,
    400: paymentResponseFail,
  },
};

export type PaymentBody = Static<typeof processPaymentSchema.body>;
