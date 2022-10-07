import { ShippingInfo } from '../types/cart.type';
import { OrderItem } from './others.model';

export type Order = {
  _id: string;
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  user: string;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
};
