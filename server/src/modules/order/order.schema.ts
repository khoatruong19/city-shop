import { Static, Type } from '@sinclair/typebox';

const shippingInfo = Type.Object({
  _id: Type.Optional(Type.String()),
  address: Type.String(),
  city: Type.Optional(Type.String()),
  state: Type.String(),
  country: Type.String(),
  pinCode: Type.Optional(Type.Number()),
  phoneNo: Type.String(),
});

const orderItem = Type.Object({
  _id: Type.Optional(Type.String()),
  productName: Type.String(),
  productImage: Type.String(),
  productId: Type.String(),
  productPrice: Type.Number(),
  quantity: Type.Number(),
});

const paymentInfo = Type.Object({
  _id: Type.Optional(Type.String()),
  id: Type.String(),
  status: Type.String(),
});

const order = Type.Object({
  _id: Type.String(),
  shippingInfo,
  orderItems: Type.Array(orderItem),
  user: Type.String(),
  paymentInfo,
  paidAt: Type.String(),
  deliveryAt: Type.Optional(Type.String()),
  itemsPrice: Type.Number(),
  taxPrice: Type.Number(),
  shippingPrice: Type.Number(),
  totalPrice: Type.Number(),
  orderStatus: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

const orderResponseSuccess = Type.Object({
  message: Type.String(),
  order: Type.Optional(order),
  orders: Type.Optional(Type.Array(order)),
  totalAmount: Type.Optional(Type.Number()),
});

const orderResponseFailure = Type.Object({
  message: Type.String(),
  error: Type.String(),
  statusCode: Type.Number(),
});

const orderUDResponse = Type.Object({
  message: Type.String(),
  success: Type.Boolean(),
});

export const createOrderSchema = {
  tags: ['order'],
  description: 'Create a order resource',
  body: Type.Object({
    shippingInfo,
    orderItems: Type.Array(orderItem),
    paymentInfo,
    itemsPrice: Type.Number(),
    taxPrice: Type.Number(),
    shippingPrice: Type.Number(),
    totalPrice: Type.Number(),
  }),
  response: {
    201: orderResponseSuccess,
  },
};

export const getSingleOrderSchema = {
  tags: ['order'],
  description: 'Get order resource',
  params: {
    id: Type.String(),
  },
  response: {
    200: orderResponseSuccess,
    404: orderResponseFailure,
  },
};

export const getAllOrdersByUserSchema = {
  tags: ['order'],
  description: 'Get all orders resource',
  response: {
    200: orderResponseSuccess,
    404: orderResponseFailure,
  },
};

export const getAllOrdersByAdminSchema = {
  tags: ['order'],
  description: 'Get all orders resource',
  response: {
    200: orderResponseSuccess,
    404: orderResponseFailure,
  },
};

export const updateOrderStatusSchema = {
  tags: ['order'],
  description: 'Update order status resource',
  params: {
    id: Type.String(),
  },
  body: Type.Object({
    status: Type.String(),
  }),
  response: {
    200: orderUDResponse,
    404: orderResponseFailure,
    400: orderResponseFailure,
  },
};

export const deleteOrderSchema = {
  tags: ['order'],
  description: 'Delete order  resource',
  params: {
    id: Type.String(),
  },
  response: {
    200: orderUDResponse,
    404: orderResponseFailure,
  },
};

export type CreateOrderBody = Static<typeof createOrderSchema.body>;
export type UpdateOrderStatusBody = Static<typeof updateOrderStatusSchema.body>;
