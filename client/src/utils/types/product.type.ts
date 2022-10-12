export type getProductQueries = {
  keyword: string;
  currentPage: number;
  category?: string;
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
