import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import { User } from '../../utils/models/user.model';
import {
  LoginUserParams,
  RegisterUserParams,
} from '../../utils/types/user.type';

interface UserSliceState {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserSliceState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (params: RegisterUserParams, thunkApi) => {
    try {
      const res = await userApi.register(params);
      return res.data.user;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Register user fail!');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (params: LoginUserParams, thunkApi) => {
    try {
      const res = await userApi.login(params);
      return res.data.user;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Login user fail!');
    }
  }
);

export const me = createAsyncThunk('user/me', async (_, thunkApi) => {
  try {
    const res = await userApi.me();
    return res.data.user;
  } catch (error: any) {
    if (error.data.message) return thunkApi.rejectWithValue(error.data.message);
    return thunkApi.rejectWithValue('Me fail!');
  }
});

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    const res = await userApi.logout();
    return res.data.message;
  } catch (error: any) {
    if (error.data.message) return thunkApi.rejectWithValue(error.data.message);
    return thunkApi.rejectWithValue('Logout fail!');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.loading = false;
          state.user = payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(
        registerUser.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated = false;
          state.error = payload;
        }
      )

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.loading = false;
          state.user = payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = payload;
      })

      .addCase(me.pending, (state) => {
        state.loading = true;
      })
      .addCase(me.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.loading = false;
        state.user = payload;
        state.isAuthenticated = true;
      })
      .addCase(me.rejected, (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = payload;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = payload;
      });
  },
});

export const { clearUserError } = userSlice.actions;

export default userSlice.reducer;
