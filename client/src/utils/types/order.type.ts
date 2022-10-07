import { CartItem, ShippingInfo } from './cart.type';

export type OrderItem = {
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
  productId: string;
};

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
