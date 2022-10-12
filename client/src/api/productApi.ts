import { Product } from '../utils/models/product.model';
import {
  createProductReviewParams,
  getProductQueries,
} from '../utils/types/product.type';
import axiosClient from './axiosClient';

type ProductsResponse = {
  message: string;
  products: Product[];
  productsCount: number;
  resultsPerPage: number;
  filteredProductsCount: number;
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
  getSingleDetail: (id: string) =>
    axiosClient.get<ProductResponse>(`products/${id}`),
  addNewReview: ({ id, ...rest }: createProductReviewParams) =>
    axiosClient.post<UDProductResponse>(`products/${id}/reviews`, rest),
};

export default productApi;
