import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import { User } from '../../utils/models/user.model';
import {
  LoginUserParams,
  RegisterUserParams,
  ResetPasswordParams,
  UpdateUserParams,
} from '../../utils/types/user.type';

interface UserSliceState {
  loading: boolean;
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  updateLoading: boolean;
  message: string;
  error: string | null;
}

const initialState: UserSliceState = {
  loading: false,
  user: null,
  users: [],
  isAuthenticated: false,
  isDeleted: false,
  isUpdated: false,
  updateLoading: false,
  message: '',
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

export const getAllUsers = createAsyncThunk(
  'user/getAll',
  async (_, thunkApi) => {
    try {
      const res = await userApi.getAllUsers();
      return res.data.users;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Get All Users fail!');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, thunkApi) => {
    try {
      await userApi.deleteUser(id);
      return id;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Delete User fail!');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (params: UpdateUserParams, thunkApi) => {
    try {
      await userApi.updateUser(params);
      return params;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Update User fail!');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, thunkApi) => {
    try {
      const res = await userApi.forgotPassword(email);
      return res.data.message;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Send Email fail!');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (params: ResetPasswordParams, thunkApi) => {
    try {
      const res = await userApi.resetPassword(params);
      return res.data.message;
    } catch (error: any) {
      if (error.data.message)
        return thunkApi.rejectWithValue(error.data.message);
      return thunkApi.rejectWithValue('Reset password fail!');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    resetUpdateUserStatus: (state) => {
      state.isUpdated = false;
    },
    resetDeleteUserStatus: (state) => {
      state.isDeleted = false;
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
      })

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = payload;
        }
      )
      .addCase(
        getAllUsers.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isDeleted = true;
        state.users = [...state.users].filter((user) => user._id !== payload);
      })
      .addCase(
        deleteUser.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload: { id, ...rest } }) => {
        state.updateLoading = false;
        state.isUpdated = true;
        state.users = [...state.users].map((user) => {
          if (user._id === id) return { ...user, ...rest };
          return user;
        });
      })
      .addCase(
        updateUser.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.updateLoading = false;
          state.error = payload;
        }
      )

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload;
      })
      .addCase(
        forgotPassword.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload;
      })
      .addCase(
        resetPassword.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export const { clearUserError, resetDeleteUserStatus, resetUpdateUserStatus } =
  userSlice.actions;

export default userSlice.reducer;
