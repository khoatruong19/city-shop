import { Product, UserReview } from '../utils/models/product.model';
import {
  createProductParams,
  createProductReviewParams,
  DeleteProductReviewParams,
  getProductQueries,
  updateProductParams,
} from '../utils/types/product.type';
import axiosClient from './axiosClient';

type ProductsResponse = {
  message: string;
  products: Product[];
  productsCount: number;
  resultsPerPage?: number;
  filteredProductsCount?: number;
};

type ProductResponse = {
  message: string;
  product: Product;
};

type UDProductResponse = {
  success: boolean;
  message: string;
};

type ReviewsResponse = {
  message: string;
  reviews: UserReview[];
};

const productApi = {
  getMany: ({ currentPage, keyword, category }: getProductQueries) => {
    if (category)
      return axiosClient.get<ProductsResponse>(
        `products?keyword=${keyword}&page=${currentPage}&category=${category}`
      );
    else
      return axiosClient.get<ProductsResponse>(
        `products?keyword=${keyword}&page=${currentPage}`
      );
  },
  getAllByAdmin: () => {
    return axiosClient.get<ProductsResponse>(`products/admin`);
  },
  deleteProduct: (id: string) => {
    return axiosClient.delete<UDProductResponse>(`products/${id}`);
  },
  updateProduct: ({ id, ...rest }: updateProductParams) => {
    return axiosClient.patch<ProductResponse>(`products/${id}`, rest);
  },
  getSingleDetail: (id: string) =>
    axiosClient.get<ProductResponse>(`products/${id}`),
  createProduct: (params: createProductParams) =>
    axiosClient.post<ProductResponse>(`products`, params),
  getProductReviews: (id: string) =>
    axiosClient.get<ReviewsResponse>(`products/${id}/reviews`),
  addNewReview: ({ id, ...rest }: createProductReviewParams) =>
    axiosClient.post<UDProductResponse>(`products/${id}/reviews`, rest),
  deleteReview: ({ productId, reviewId }: DeleteProductReviewParams) =>
    axiosClient.delete<UDProductResponse>(
      `products/${productId}/reviews?reviewId=${reviewId}`
    ),
};

export default productApi;
