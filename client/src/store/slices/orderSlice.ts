import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import orderApi from '../../api/orderApi';
import { Order } from '../../utils/models/order.model';
import {
  CreateOrderParams,
  UpdateOrderStatusParams,
} from '../../utils/types/order.type';

interface OrderSliceState {
  orders: Order[];
  order: Order;
  isUpdated: boolean;
  isDeleted: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OrderSliceState = {
  orders: [],
  order: {} as Order,
  isUpdated: false,
  isDeleted: false,
  loading: false,
  error: null,
};

//user
export const createOrder = createAsyncThunk(
  'order/create',
  async (params: CreateOrderParams, thunkApi) => {
    try {
      console.log({ params });
      const res = await orderApi.createOrder(params);
      return res.data.order;
    } catch (error) {
      return thunkApi.rejectWithValue(`Create order fail. ${error}`);
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  'order/orderDetail',
  async (id: string, thunkApi) => {
    try {
      const res = await orderApi.getOrderDetail(id);
      return res.data.order;
    } catch (error) {
      return thunkApi.rejectWithValue(`Get order detail fail. ${error}`);
    }
  }
);

export const getAllUserOrders = createAsyncThunk(
  'order/userOrders',
  async (_, thunkApi) => {
    try {
      const res = await orderApi.getAllUserOrders();
      return res.data.orders;
    } catch (error) {
      return thunkApi.rejectWithValue(`Get all user orders fail. ${error}`);
    }
  }
);

//admin
export const getAllOrdersByAdmin = createAsyncThunk(
  'order/adminOrders',
  async (_, thunkApi) => {
    try {
      const res = await orderApi.getAllOrders();
      return res.data.orders;
    } catch (error) {
      return thunkApi.rejectWithValue(`Get all orders by admin fail. ${error}`);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateOrder',
  async (params: UpdateOrderStatusParams, thunkApi) => {
    try {
      const res = await orderApi.updateOrderStatus(params);
      return res.data.success;
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Update order status by admin fail. ${error}`
      );
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (id: string, thunkApi) => {
    try {
      const res = await orderApi.deleteOrder(id);
      return res.data.success;
    } catch (error) {
      return thunkApi.rejectWithValue(`Delete order by admin fail. ${error}`);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    resetUpdateOrderStatus: (state) => {
      state.isUpdated = false;
    },
    resetDeleteOrderStatus: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createOrder.fulfilled,
        (state, { payload }: PayloadAction<Order>) => {
          state.loading = false;
          state.order = payload;
        }
      )
      .addCase(
        createOrder.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getOrderDetail.fulfilled,
        (state, { payload }: PayloadAction<Order>) => {
          state.loading = false;
          state.order = payload;
        }
      )
      .addCase(
        getOrderDetail.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getAllUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllUserOrders.fulfilled,
        (state, { payload }: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = payload;
        }
      )
      .addCase(
        getAllUserOrders.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getAllOrdersByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllOrdersByAdmin.fulfilled,
        (state, { payload }: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = payload;
        }
      )
      .addCase(
        getAllOrdersByAdmin.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, { payload }: PayloadAction<boolean>) => {
          state.loading = false;
          if (payload === true) state.isUpdated = true;
        }
      )
      .addCase(
        updateOrderStatus.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, { payload }: PayloadAction<boolean>) => {
          state.loading = false;
          if (payload === true) state.isDeleted = true;
        }
      )
      .addCase(
        deleteOrder.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export const {
  clearOrderError,
  resetDeleteOrderStatus,
  resetUpdateOrderStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
