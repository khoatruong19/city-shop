import { User } from '../utils/models/user.model';
import {
  LoginUserParams,
  RegisterUserParams,
  UpdatePasswordParams,
  UpdateProfileParams,
} from '../utils/types/user.type';
import axiosClient from './axiosClient';

type UserResponse = {
  message: string;
  user: User;
};

type UsersResponse = {
  message: string;
  users: User[];
};

const userApi = {
  register: (params: RegisterUserParams) =>
    axiosClient.post<UserResponse>('auth/register', params),
  login: (params: LoginUserParams) =>
    axiosClient.post<UserResponse>('auth/login', params),
  me: () => axiosClient.get<UserResponse>('auth/me'),
  logout: () => axiosClient.post<{ message: string }>('auth/logout'),
  updateProfile: (params: UpdateProfileParams) =>
    axiosClient.put<UserResponse>('auth/me/profile-update', params),
  updatePassword: (params: UpdatePasswordParams) =>
    axiosClient.put<UserResponse>('auth/me/password-update', params),
  getAllUsers: () => axiosClient.get<UsersResponse>('users'),
};

export default userApi;
