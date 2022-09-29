import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify, { FastifyRequest } from 'fastify';
import { authRoute } from '../modules/auth/auth.route';
import { orderRoute } from '../modules/order/order.route';
import { productRoute } from '../modules/product/product.route';
import { userRoute } from '../modules/user/user.route';
import { config } from './config';
import cors from '@fastify/cors';

export async function createServer() {
  const app = fastify();

  app.register(productRoute, { prefix: '/api/products' });
  app.register(authRoute, { prefix: '/api/auth' });
  app.register(userRoute, { prefix: '/api/users' });
  app.register(orderRoute, { prefix: '/api/orders' });

  app.register(cors, {
    origin: 'http://localhost:3000',
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
      httpOnly: true,
      sameSite: 'lax',
    },
  } as FastifyCookieOptions);

  return app;
}
