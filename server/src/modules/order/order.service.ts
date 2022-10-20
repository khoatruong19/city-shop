import { Types } from 'mongoose';
import { CreateOrderInput, UpdateOrderStatusInput } from '../../utils/types';
import { updateStock } from '../product/product.service';
import { Order, OrderModel } from './order.model';

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const { userId, value } = input;
  //Create 2 entities same time error
  const order = await OrderModel.create({
    ...value,
    user: userId,
  });

  //Solution
  const existingOrders = await OrderModel.find({
    user: userId,
    paymentInfo: order.paymentInfo,
  });

  await existingOrders[1].remove();

  return existingOrders[0];
}

export async function getSingleOrder(
  id: Types.ObjectId
): Promise<Order | null> {
  const order = await OrderModel.findById(id).populate('user', 'name email');
  if (!order) return null;
  console.log(order.user);

  return order;
}

export async function getAllOrdersByUser(
  userId: Types.ObjectId
): Promise<Order[]> {
  return await OrderModel.find({ user: userId });
}

export async function getAllOrdersByAdmin(): Promise<Order[]> {
  const orders = await OrderModel.find().populate('user', 'name email');

  return orders;
}

export async function updateOrderStatus(input: UpdateOrderStatusInput) {
  const { order, status } = input;
  if (status === 'Shipped') {
    order.orderItems.forEach(async (o) => {
      await updateStock({ productId: o.productId, quantity: o.quantity });
    });
  }
  order.orderStatus = status;

  if (status === 'Delivered') {
    order.deliveryAt = new Date();
  }

  await order.save({ validateBeforeSave: false });
}

export async function deleteOrder(id: Types.ObjectId): Promise<boolean> {
  const order = await OrderModel.findById(id);

  if (!order) return false;

  await order.remove();

  return true;
}
