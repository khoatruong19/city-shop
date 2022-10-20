import { CartItem, ShippingInfo } from '../types/cart.type';
import { OrderItem } from '../types/order.type';
import { User } from './user.model';

export type Order = {
  _id: string;
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  user: {
    name: string;
    email: string;
  };
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
