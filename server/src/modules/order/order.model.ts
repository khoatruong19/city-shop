import { getModelForClass, prop, PropType } from '@typegoose/typegoose';
import { Document, Types } from 'mongoose';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';

export class ShippingInfo {
  @prop({ type: String })
  address: string;

  @prop({ type: String })
  city: string;

  @prop({ type: String })
  state: string;

  @prop({ type: String })
  country: string;

  @prop({ type: Number })
  pinCode: number;

  @prop({ type: String })
  phoneNo: string;
}

export class OrderItem {
  @prop({ type: String, required: true })
  productName: string;

  @prop({ type: Number, required: true })
  productPrice: number;

  @prop({ type: Number, required: true })
  quantity: number;

  @prop({ type: String, required: true })
  productImage: string;

  @prop({
    ref: () => Product,
    required: true,
  })
  productId: Types.ObjectId;
}

export class PaymentInfo {
  @prop({ type: String, required: true })
  id: string;

  @prop({ type: String, required: true })
  status: string;
}

export class Order extends Document {
  @prop({ type: () => ShippingInfo })
  shippingInfo: ShippingInfo;

  @prop({ type: () => [OrderItem] }, PropType.ARRAY)
  orderItems: OrderItem[];

  @prop({
    ref: () => User,
    required: true,
  })
  user: Types.ObjectId;

  @prop({ type: () => PaymentInfo, _id: false })
  paymentInfo: PaymentInfo;

  @prop({ type: Date, default: Date.now() })
  paidAt: Date;

  @prop({ type: Number, required: true, default: 0 })
  itemsPrice: number;

  @prop({ type: Number, default: 0 })
  taxPrice: number;

  @prop({ type: Number, required: true, default: 0 })
  shippingPrice: number;

  @prop({ type: Number, required: true, default: 0 })
  totalPrice: number;

  @prop({ type: String, required: true, default: 'Processing' })
  orderStatus: string;

  @prop({ type: Date })
  deliveryAt: Date;
}

export const OrderModel = getModelForClass(Order, {
  schemaOptions: {
    timestamps: true,
  },
});
