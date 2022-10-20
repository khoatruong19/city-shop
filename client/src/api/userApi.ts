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

type UDUserResponse = {
  success: boolean;
  message: string;
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
  deleteUser: (id: string) => axiosClient.delete<UDUserResponse>(`users/${id}`),
};

export default userApi;
