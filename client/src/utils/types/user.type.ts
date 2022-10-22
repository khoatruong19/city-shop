export type RegisterUserParams = {
  name: string;
  email: string;
  avatar: string;
  password: string;
};

export type LoginUserParams = {
  email: string;
  password: string;
};

export type UpdateProfileParams = {
  email: string;
  name: string;
  avatar: string;
};

export type UpdatePasswordParams = {
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;
};

export type UserRoles = 'admin' | 'user' | 'creator';

export type UpdateUserParams = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
};

export type ResetPasswordParams = {
  token: string;
  password: string;
  confirmPassword: string;
};
