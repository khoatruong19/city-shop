import { ImageModel } from '../models/others.model';

export type getProductQueries = {
  keyword: string;
  currentPage: number;
  category?: string;
};

export type createProductParams = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: Omit<ImageModel, '_id'>[];
};

export type createProductReviewParams = {
  id: string;
  rating: number;
  comment: string;
};

export type DeleteProductReviewParams = {
  productId: string;
  reviewId: string;
};
