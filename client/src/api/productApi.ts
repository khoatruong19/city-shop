import { Product } from '../utils/models/product.model';
import axiosClient from './axiosClient';

type ProductsResponse = {
  message: string;
  products: Product[];
};

type ProductResponse = {
  message: string;
  product: Product;
};

const productApi = {
  getAll: () => axiosClient.get<ProductsResponse>('products'),
  getSingleDetail: (id: string) =>
    axiosClient.get<ProductResponse>(`products/${id}`),
};

export default productApi;
