import { User } from '../utils/models/user.model';
import { LoginUserParams, RegisterUserParams } from '../utils/types/user.type';
import axiosClient from './axiosClient';

type UserResponse = {
  message: string;
  user: User;
};

const config = { headers: { 'Content-Type': 'application/json' } };

const userApi = {
  register: (params: RegisterUserParams) =>
    axiosClient.post<UserResponse>('auth/register', params, config),
  login: (params: LoginUserParams) =>
    axiosClient.post<UserResponse>('auth/login', params, config),
  me: () => axiosClient.get<UserResponse>('auth/me', config),
};

export default userApi;
