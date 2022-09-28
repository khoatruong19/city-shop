import { getModelForClass, prop, PropType } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Image } from '../../utils/helpers/image';

export class UserReview {
  @prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: mongoose.Types.ObjectId;

  @prop({
    type: String,
    required: true,
  })
  name: string;

  @prop({
    type: Number,
    required: true,
  })
  rating: number;

  @prop({
    type: String,
  })
  comment: string;

  @prop({
    type: Date,
    default: Date.now(),
  })
  time: Date;
}

export class Product {
  @prop({
    type: String,
    required: [true, 'Please enter a name of product'],
    trim: true,
    maxlength: [20, 'Prodyct name can not exceed 20 characters'],
  })
  name: string;

  @prop({
    type: String,
    required: [true, 'Please enter a description of product'],
    maxlength: [4000, 'Description is can not exceed than 4000 characters'],
  })
  description: string;

  @prop({
    type: Number,
    required: [true, 'Please add a price for your product'],
    max: [9999999, 'Price can not exceed than 8 figures'],
  })
  price: number;

  @prop({
    type: String,
    maxlength: [4, 'Discount price can not exceed than 4 characters'],
  })
  discountPrice: string;

  @prop({
    type: String,
  })
  color: string;

  @prop({
    type: String,
  })
  size: string;

  @prop({
    type: Number,
    default: 0,
  })
  ratings: number;

  @prop({ type: () => [Image] }, PropType.ARRAY)
  images: Image[];

  @prop({
    type: String,
    required: [true, 'Please add a category of your product'],
  })
  category: string;

  @prop({
    type: Number,
    required: [true, 'Please add some stocks for your product'],
    max: [999, 'Stock can not exceed than 3 figures'],
  })
  stock: number;

  @prop({
    type: Number,
    default: 0,
  })
  numOfReviews: number;

  @prop({ type: () => [UserReview] }, PropType.ARRAY)
  reviews: UserReview[];

  @prop({
    ref: 'User',
  })
  user: mongoose.Types.ObjectId;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
  },
});
