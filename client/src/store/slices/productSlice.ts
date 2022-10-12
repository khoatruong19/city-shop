import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';
import { Product } from '../../utils/models/product.model';
import {
  createProductReviewParams,
  getProductQueries,
} from '../../utils/types/product.type';

interface ProductSliceState {
  loading: boolean;
  reviewLoading: boolean;
  products: Product[];
  product: Product;
  productsCount: number;
  resultsPerPage: number;
  error: string | null;
}

const initialState: ProductSliceState = {
  loading: false,
  reviewLoading: false,
  products: [],
  product: {} as Product,
  productsCount: 0,
  resultsPerPage: 0,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  'product/getAll',
  async (queries: getProductQueries, thunkApi) => {
    try {
      const res = await productApi.getMany(queries);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(`Get all products fail. ${error}`);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  'product/getDetail',
  async (id: string, thunkApi) => {
    try {
      const res = await productApi.getSingleDetail(id);
      return res.data.product;
    } catch (error) {
      return thunkApi.rejectWithValue(`Get product detail fail. ${error}`);
    }
  }
);

export const createProductReview = createAsyncThunk(
  'product/createReview',
  async (params: createProductReviewParams, thunkApi) => {
    try {
      const res = await productApi.addNewReview(params);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(`Add product review fail. ${error}`);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder //Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.products;
        state.resultsPerPage = payload.resultsPerPage;
        state.productsCount = payload.productsCount;
      })
      .addCase(
        getAllProducts.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )
      //Get Product Detail
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProductDetail.fulfilled,
        (state, { payload }: PayloadAction<Product>) => {
          state.loading = false;
          state.product = payload;
        }
      )
      .addCase(
        getProductDetail.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )
      //Add Product Review
      .addCase(createProductReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(createProductReview.fulfilled, (state) => {
        state.reviewLoading = false;
      })
      .addCase(
        createProductReview.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.reviewLoading = false;
          state.error = payload;
        }
      );
  },
});

export const { clearProductError } = productSlice.actions;

export default productSlice.reducer;
