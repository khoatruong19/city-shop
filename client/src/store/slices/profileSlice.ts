import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import {
  UpdatePasswordParams,
  UpdateProfileParams,
} from '../../utils/types/user.type';

interface ProfileSliceState {
  loading: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
  error: string | null;
}

const initialState: ProfileSliceState = {
  loading: false,
  isDeleted: false,
  isUpdated: false,
  error: null,
};

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (params: UpdateProfileParams, thunkApi) => {
    try {
      const res = await userApi.updateProfile(params);
      return res.data.user;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Update profile fail!');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'profile/updatePassword',
  async (params: UpdatePasswordParams, thunkApi) => {
    try {
      const res = await userApi.updatePassword(params);
      console.log({ res });
      return res.data.user;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Update password fail!');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    resetUpdateState: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(
        updateProfile.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(
        updatePassword.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export const { clearProfileError, resetUpdateState } = profileSlice.actions;

export default profileSlice.reducer;
