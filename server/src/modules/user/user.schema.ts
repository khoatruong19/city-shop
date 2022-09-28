import { Static, Type } from '@sinclair/typebox';
import {
  userResponseWithCredentials,
  userResponseWithoutCredentials,
} from '../auth/auth.schema';

export const getAllUsersSchema = {
  tags: ['user'],
  description: 'All users',
  response: {
    200: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export const getSingleUserSchema = {
  tags: ['user'],
  description: 'Single user',
  params: {
    id: Type.String(),
  },
  response: {
    200: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export const updateUserRoleSchema = {
  tags: ['user'],
  description: 'Update user role',
  params: {
    id: Type.String(),
  },
  body: Type.Object({
    name: Type.String(),
    email: Type.String({ format: 'email' }),
    role: Type.String(),
  }),
  response: {
    200: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export const deleteUserSchema = {
  tags: ['user'],
  description: 'Delete user',
  params: {
    id: Type.String(),
  },
  response: {
    200: userResponseWithCredentials,
    400: userResponseWithoutCredentials,
  },
};

export type updateUserRoleBody = Static<typeof updateUserRoleSchema.body>;
