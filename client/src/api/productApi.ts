import { Product } from '../utils/models/product.model';
import {
  createProductParams,
  createProductReviewParams,
  DeleteProductReviewParams,
  getProductQueries,
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
  getSingleDetail: (id: string) =>
    axiosClient.get<ProductResponse>(`products/${id}`),
  createProduct: (params: createProductParams) =>
    axiosClient.post<ProductResponse>(`products`, params),
  addNewReview: ({ id, ...rest }: createProductReviewParams) =>
    axiosClient.post<UDProductResponse>(`products/${id}/reviews`, rest),
  deleteReview: ({ productId, reviewId }: DeleteProductReviewParams) =>
    axiosClient.delete<UDProductResponse>(
      `products/${productId}/reviews?reviewId=${reviewId}`
    ),
};

export default productApi;
