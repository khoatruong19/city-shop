import { Order } from '../utils/models/order.model';
import {
  CreateOrderParams,
  UpdateOrderStatusParams,
} from '../utils/types/order.type';
import axiosClient from './axiosClient';

type OrderResponse = {
  message: string;
  order: Order;
};

type OrdersResponse = {
  message: string;
  orders: Order[];
};

type UDOrderResponse = {
  message: string;
  success: boolean;
};

const orderApi = {
  //user
  createOrder: (params: CreateOrderParams) =>
    axiosClient.post<OrderResponse>(`orders`, params),
  getAllUserOrders: () => axiosClient.get<OrdersResponse>(`orders/me`),
  getOrderDetail: (id: string) =>
    axiosClient.get<OrderResponse>(`orders/${id}`),
  //admin
  getAllOrders: () => axiosClient.get<OrdersResponse>(`orders`),
  updateOrderStatus: (params: UpdateOrderStatusParams) =>
    axiosClient.put<UDOrderResponse>(`orders/${params.id}`, {
      status: params.status,
    }),
  deleteOrder: (id: string) =>
    axiosClient.delete<UDOrderResponse>(`orders/${id}`),
};

export default orderApi;
