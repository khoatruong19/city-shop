import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { authRoute } from '../modules/auth/auth.route';
import { orderRoute } from '../modules/order/order.route';
import { productRoute } from '../modules/product/product.route';
import { userRoute } from '../modules/user/user.route';
import { config, __prod__ } from './config';
import cors from '@fastify/cors';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'fastify-file-upload';
import { paymentRoute } from '../modules/payment/payment.route';

export async function createServer() {
  const app = fastify();

  app.register(productRoute, { prefix: '/api/products' });
  app.register(authRoute, { prefix: '/api/auth' });
  app.register(userRoute, { prefix: '/api/users' });
  app.register(orderRoute, { prefix: '/api/orders' });
  app.register(paymentRoute, { prefix: '/api/payment' });

  app.register(cors, {
    origin: __prod__
      ? process.env.CORS_ORIGIN_PROD
      : process.env.CORS_ORIGIN_DEV,
    credentials: true,
  });

  app.register(fastifyJwt, {
    secret: config.JWT_SECRET,
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  app.register(cookie, {
    secret: config.COOKIE_SECRET,
    parseOptions: {
      path: '/',
      httpOnly: false,
      sameSite: 'none',
      secure: __prod__,
    },
  } as FastifyCookieOptions);

  app.register(fileUpload);

  cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  });

  return app;
}
