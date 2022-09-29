import { ImageModel } from './others.model';

export type UserReview = {
  _id: string;
  user: string;
  name: string;
  comment: string;
  rating: number;
  time: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: ImageModel[];
  category: string;
  discountPrice: string;
  stock: number;
  ratings: number;
  numOfReviews: number;
  reviews: UserReview[];
  createdAt: string;
  updatedAt: string;
};
