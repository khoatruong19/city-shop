import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    profile: profileReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
