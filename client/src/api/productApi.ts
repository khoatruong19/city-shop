import { Product } from '../utils/models/product.model';
import { getProductQueries } from '../utils/types/product.type';
import axiosClient from './axiosClient';

type ProductsResponse = {
  message: string;
  products: Product[];
  productsCount: number;
  resultPerPage: number;
  filteredProductsCount: number;
};

type ProductResponse = {
  message: string;
  product: Product;
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
};

export default productApi;
