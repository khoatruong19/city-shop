import { FastifyRequest } from 'fastify';
import { User } from '../modules/user/user.model';
import { Types } from 'mongoose';
import { CreateOrderBody } from '../modules/order/order.schema';
import { Order } from '../modules/order/order.model';

export type QueryRequest = FastifyRequest<{
  Querystring: { keyword: string; category: string; page: string };
}>;

export type SendMailServiceInput = {
  user: User;
  protocol: string;
  hostname: string;
};

export type ResetPasswordInput = {
  tokenParam: string;
  newPassword: string;
};

export type UpdatePasswordInput = {
  userId: Types.ObjectId;
  oldPassword: string;
  newPassword: string;
};

export type UpdateProfileInput = {
  userId: Types.ObjectId;
  email: string;
  name: string;
};

export type UpdateRoleInput = {
  userId: Types.ObjectId;
  email: string;
  name: string;
  role: string;
};

export type CreateProductReviewInput = {
  productId: Types.ObjectId;
  review: {
    user: Types.ObjectId;
    name: string;
    rating: number;
    comment: string;
  };
};

export type DeleteProductReviewInput = {
  productId: Types.ObjectId;
  reviewId: Types.ObjectId;
};

export type UpdateProductStockInput = {
  productId: Types.ObjectId;
  quantity: number;
};

export type CreateOrderInput = {
  userId: Types.ObjectId;
  value: CreateOrderBody;
};

export type UpdateOrderStatusInput = {
  order: Order;
  status: string;
};
