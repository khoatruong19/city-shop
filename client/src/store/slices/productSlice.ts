import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';
import { Product, UserReview } from '../../utils/models/product.model';
import {
  createProductParams,
  createProductReviewParams,
  DeleteProductReviewParams,
  getProductQueries,
  updateProductParams,
} from '../../utils/types/product.type';

interface ProductSliceState {
  loading: boolean;
  reviewLoading: boolean;
  products: Product[];
  product: Product;
  productReviews: {
    productId: string;
    reviews: UserReview[];
  };
  productsCount: number;
  resultsPerPage: number;
  isDeleted: boolean;
  isUpdated: boolean;
  error: string | null;
}

const initialState: ProductSliceState = {
  loading: false,
  reviewLoading: false,
  products: [],
  product: {} as Product,
  productReviews: {
    productId: '',
    reviews: [],
  },
  productsCount: 0,
  resultsPerPage: 0,
  isDeleted: false,
  isUpdated: false,
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

export const getAllProductsByAdmin = createAsyncThunk(
  'product/getAllByAdmin',
  async (_, thunkApi) => {
    try {
      const res = await productApi.getAllByAdmin();
      return {
        products: res.data.products,
        productsCount: res.data.productsCount,
      };
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
      return thunkApi.rejectWithValue(
        `Get all products by admin fail! ${error}`
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (params: createProductParams, thunkApi) => {
    try {
      const res = await productApi.createProduct(params);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(`Add product fail. ${error}`);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (params: updateProductParams, thunkApi) => {
    try {
      const res = await productApi.updateProduct(params);
      return res.data.product;
    } catch (error) {
      return thunkApi.rejectWithValue(`Delete product fail. ${error}`);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: string, thunkApi) => {
    try {
      const res = await productApi.deleteProduct(id);
      if (res.data && res.data.success) return { id };
    } catch (error) {
      return thunkApi.rejectWithValue(`Delete product fail. ${error}`);
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

export const deleteProductReview = createAsyncThunk(
  'product/deleteReview',
  async (params: DeleteProductReviewParams, thunkApi) => {
    try {
      await productApi.deleteReview(params);
      return params;
    } catch (error) {
      return thunkApi.rejectWithValue(`Delete product review fail. ${error}`);
    }
  }
);

export const getProductReviews = createAsyncThunk(
  'product/productReviews',
  async (id: string, thunkApi) => {
    try {
      const res = await productApi.getProductReviews(id);
      return {
        productId: id,
        reviews: res.data.reviews,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(`Get product reviews fail. ${error}`);
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
    resetDeleteProductStatus: (state) => {
      state.isDeleted = false;
    },
    resetUpdateProductStatus: (state) => {
      state.isUpdated = false;
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
        state.resultsPerPage = payload.resultsPerPage!;
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
      )
      //Delete Product Review
      .addCase(deleteProductReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(deleteProductReview.fulfilled, (state, { payload }) => {
        state.reviewLoading = false;
        state.isDeleted = true;
        if (state.productReviews.productId === payload.productId) {
          state.productReviews.reviews = [
            ...state.productReviews.reviews.filter(
              (review) => review._id !== payload.reviewId
            ),
          ];
        }
      })
      .addCase(
        deleteProductReview.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.reviewLoading = false;
          state.error = payload;
        }
      )

      //Get All Products By Admin
      .addCase(getAllProductsByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsByAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.products;
        state.productsCount = payload.productsCount;
      })
      .addCase(
        getAllProductsByAdmin.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      //Create Product By Admin
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = [...state.products, payload.product];
        state.productsCount = state.productsCount + 1;
      })
      .addCase(
        createProduct.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      //Update Product By Admin
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.product = payload;
        state.products = [...state.products].map((product) => {
          if (product._id === payload._id) return payload;
          return product;
        });
        state.isUpdated = true;
      })
      .addCase(
        updateProduct.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      //Delete Product By Admin
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = [...state.products].filter(
          (product) => product._id !== payload?.id!
        );
        state.productsCount = state.productsCount - 1;
        state.isDeleted = true;
      })
      .addCase(
        deleteProduct.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      //Get Product Reviews By Admin
      .addCase(getProductReviews.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, { payload }) => {
        state.reviewLoading = false;
        state.productReviews = payload;
      })
      .addCase(
        getProductReviews.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.reviewLoading = false;
          state.error = payload;
        }
      );
  },
});

export const {
  clearProductError,
  resetDeleteProductStatus,
  resetUpdateProductStatus,
} = productSlice.actions;

export default productSlice.reducer;
