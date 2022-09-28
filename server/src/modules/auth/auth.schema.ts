import { Static, Type } from '@sinclair/typebox';

const UserAvatar = Type.Object({
  _id: Type.Optional(Type.String()),
  public_id: Type.String(),
  url: Type.String(),
});

export const user = Type.Object({
  _id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  avatar: UserAvatar,
  role: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export const userResponseWithCredentials = Type.Object({
  message: Type.String(),
  user: Type.Optional(user),
  users: Type.Optional(Type.Array(user)),
  token: Type.Optional(Type.String()),
});

export const userResponseWithoutCredentials = Type.Object({
  message: Type.String(),
  error: Type.String(),
  statusCode: Type.Number(),
});

export const registerUserSchema = {
  tags: ['auth'],
  description: 'Register user',
  body: Type.Object({
    name: Type.String({ minLength: 3, maxLength: 20 }),
    email: Type.String({
      format: 'email',
    }),
    password: Type.String({ minLength: 3 }),
  }),
  response: {
    201: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export const loginUserSchema = {
  tags: ['auth'],
  description: 'Login user',
  body: Type.Object({
    email: Type.String({
      format: 'email',
    }),
    password: Type.String({ minLength: 3 }),
  }),
  response: {
    201: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export const logoutUserSchema = {
  tags: ['auth'],
  description: 'Logout user',
  response: {
    200: userResponseWithCredentials,
  },
};

export const forgotPasswordSchema = {
  tags: ['auth'],
  description: 'Forgot password',
  body: Type.Object({
    email: Type.String({
      format: 'email',
    }),
  }),
  response: {
    200: userResponseWithoutCredentials,
    400: userResponseWithoutCredentials,
  },
};

export const resetPasswordSchema = {
  tags: ['auth'],
  description: 'Reset password',
  params: Type.Object({
    token: Type.String(),
  }),
  body: Type.Object({
    password: Type.String({ minLength: 3 }),
    confirmPassword: Type.String({ minLength: 3 }),
  }),
  response: {
    200: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export const meSchema = {
  tags: ['auth'],
  description: 'Profile detail',
  response: {
    200: userResponseWithCredentials,
  },
};

export const updatePasswordSchema = {
  tags: ['auth'],
  description: 'Update password',
  body: Type.Object({
    oldPassword: Type.String({ minLength: 3 }),
    newPassword: Type.String({ minLength: 3 }),
    confirmPassword: Type.String({ minLength: 3 }),
  }),
  response: {
    200: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export const updateProfileSchema = {
  tags: ['auth'],
  description: 'Update profile',
  body: Type.Object({
    email: Type.String({ format: 'email' }),
    name: Type.String({ minLength: 3, maxLength: 20 }),
  }),
  response: {
    200: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export type RegisterUserBody = Static<typeof registerUserSchema.body>;
export type LoginUserBody = Static<typeof loginUserSchema.body>;
export type ForgotPasswordBody = Static<typeof forgotPasswordSchema.body>;
export type ResetPasswordBody = Static<typeof resetPasswordSchema.body>;
export type UpdatePasswordBody = Static<typeof updatePasswordSchema.body>;
export type UpdateProfileBody = Static<typeof updateProfileSchema.body>;

export type ResetPasswordParams = Static<typeof resetPasswordSchema.params>;
