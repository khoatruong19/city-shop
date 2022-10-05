import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../utils/types/cart.type';

interface CartSliceState {
  cartItems: CartItem[];
  shippingInfo: any;
}

const initialState: CartSliceState = {
  cartItems:
    localStorage.getItem('cartItems') !== null
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
  shippingInfo: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, { payload }: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.product === payload.product
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.product === existingItem.product ? payload : item
        );
      } else state.cartItems = [...state.cartItems, payload];

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== payload
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, { payload }: PayloadAction<any>) => {
      state.shippingInfo = payload;
      localStorage.setItem('shippingInfo', JSON.stringify(payload));
    },
  },
});

export const { addItemToCart, removeItem, saveShippingInfo } =
  cartSlice.actions;

export default cartSlice.reducer;
