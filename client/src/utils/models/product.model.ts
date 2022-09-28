type ProductImage = {
  _id: string;
  public_id: string;
  url: string;
};

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
  images: ProductImage[];
  category: string;
  discountPrice: string;
  stock: number;
  ratings: number;
  numOfReviews: number;
  reviews: UserReview[];
  createdAt: string;
  updatedAt: string;
};
