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
};

export type UpdatePasswordParams = {
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;
};
