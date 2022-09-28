import { Types } from 'mongoose';

export interface JwtPayload {
  id: Types.ObjectId;
  role: string;
  name: string;
}

export interface IResetPasswordBody {
  Body: {
    password: string;
    confirmPassword: string;
  };
}

export interface IUpdatePasswordBody {
  Body: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
}

export interface IRequestWithUserId {
  user: {
    id: string;
  };
}
