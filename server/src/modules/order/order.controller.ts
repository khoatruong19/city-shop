import { FastifyRequest, FastifyReply } from 'fastify';
import { Types } from 'mongoose';
import { ApiError } from '../../utils/helpers/error';
import { JwtPayload } from '../../utils/interfaces';
import { logger } from '../../utils/logger';
import { CreateOrderBody, UpdateOrderStatusBody } from './order.schema';
import {
  createOrder,
  deleteOrder,
  getAllOrdersByAdmin,
  getAllOrdersByUser,
  getSingleOrder,
  updateOrderStatus,
} from './order.service';

export async function createOrderHandler(
  request: FastifyRequest<{
    Body: CreateOrderBody;
  }>,
  reply: FastifyReply
) {
  try {
    const userId = (request.user as JwtPayload).id;
    const order = await createOrder({ userId, value: request.body });

    reply.send({
      message: 'Created order!',
      order,
    });
  } catch (error) {
    logger.info(`Create order error, ${error}`);
    throw new ApiError(404, 'Create order error').getErrorObject(reply);
  }
}

export async function getSingleOrderHandler(
  request: FastifyRequest<{
    Params: {
      id: Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const order = await getSingleOrder(request.params.id);

    if (!order)
      throw new ApiError(404, 'Order not found').getErrorObject(reply);

    reply.send({
      message: 'Get order detail!',
      order,
    });
  } catch (error) {
    logger.info(`Get order detail error, ${error}`);
    throw new ApiError(404, 'Get order detail error').getErrorObject(reply);
  }
}

export async function getAllOrdersByUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = (request.user as JwtPayload).id;
    const orders = await getAllOrdersByUser(userId);
    reply.send({
      message: 'Get all orders!',
      orders,
    });
  } catch (error) {
    logger.info(`Get all orders error, ${error}`);
    throw new ApiError(404, 'Get all orders error').getErrorObject(reply);
  }
}

export async function getAllOrdersByAdminHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const orders = await getAllOrdersByAdmin();
    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));

    reply.send({
      message: 'Get all orders!',
      orders,
      totalAmount,
    });
  } catch (error) {
    logger.info(`Get all orders error, ${error}`);
    throw new ApiError(404, 'Get all orders error').getErrorObject(reply);
  }
}

export async function updateOrderStatusHandler(
  request: FastifyRequest<{
    Params: {
      id: Types.ObjectId;
    };
    Body: UpdateOrderStatusBody;
  }>,
  reply: FastifyReply
) {
  try {
    const order = await getSingleOrder(request.params.id);
    if (!order)
      throw new ApiError(404, 'Order not found').getErrorObject(reply);

    if (order.orderStatus === 'Delivered')
      throw new ApiError(400, 'This order is already delivered').getErrorObject(
        reply
      );

    await updateOrderStatus({ order, status: request.body.status });

    reply.send({
      message: 'Updated order status!',
      success: true,
    });
  } catch (error) {
    logger.info(`Update order status error, ${error}`);
    throw new ApiError(404, 'Update order status error').getErrorObject(reply);
  }
}

export async function deleteOrderHandler(
  request: FastifyRequest<{
    Params: {
      id: Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const orderDeleted = await deleteOrder(request.params.id);
    if (!orderDeleted)
      throw new ApiError(404, 'Order not found').getErrorObject(reply);

    reply.send({
      message: 'Deleted order!',
      success: true,
    });
  } catch (error) {
    logger.info(`Delete order error, ${error}`);
    throw new ApiError(404, 'Delete order error').getErrorObject(reply);
  }
}
