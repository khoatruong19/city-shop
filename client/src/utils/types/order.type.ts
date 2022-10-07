import { OrderItem } from '../models/others.model';
import { ShippingInfo } from './cart.type';

export type CreateOrderParams = {
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: {
    id: string;
    status: string;
  };
};

export type UpdateOrderStatusParams = {
  id: string;
  status: string;
};
