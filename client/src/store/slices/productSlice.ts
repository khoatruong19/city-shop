import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';
import { Product } from '../../utils/models/product.model';

interface ProductSliceState {
  loading: boolean;
  products: Product[];
  product: Product;
  productsCount: number;
  resultPerPage: number;
  error: string | null;
}

const initialState: ProductSliceState = {
  loading: false,
  products: [],
  product: {} as Product,
  productsCount: 0,
  resultPerPage: 0,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  'product/getAll',
  async (_, thunkApi) => {
    try {
      const res = await productApi.getAll();
      return res.data.products;
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
      return thunkApi.rejectWithValue(`Get all products fail. ${error}`);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder //Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, { payload }: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = payload;
        }
      )
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
      );
  },
});

export const { clearError } = productSlice.actions;

export default productSlice.reducer;
