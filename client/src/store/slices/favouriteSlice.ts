import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../utils/types/cart.type';

interface FavouriteSliceState {
  favouriteItems: CartItem[];
}

const initialState: FavouriteSliceState = {
  favouriteItems:
    localStorage.getItem('favouriteItems') !== null
      ? JSON.parse(localStorage.getItem('favouriteItems')!)
      : [],
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addItemToFavourite: (state, { payload }: PayloadAction<CartItem>) => {
      const existingItem = state.favouriteItems.find(
        (item) => item.product === payload.product
      );
      if (existingItem) {
        state.favouriteItems = state.favouriteItems.map((item) =>
          item.product === existingItem.product ? payload : item
        );
      } else state.favouriteItems = [...state.favouriteItems, payload];

      localStorage.setItem(
        'favouriteItems',
        JSON.stringify(state.favouriteItems)
      );
    },
    removeFavouriteItem: (state, { payload }: PayloadAction<string>) => {
      state.favouriteItems = state.favouriteItems.filter(
        (item) => item.product !== payload
      );
      localStorage.setItem(
        'favouriteItems',
        JSON.stringify(state.favouriteItems)
      );
    },
  },
});

export const { addItemToFavourite, removeFavouriteItem } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
