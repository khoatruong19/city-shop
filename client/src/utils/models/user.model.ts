import { ImageModel } from './others.model';

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: ImageModel;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
};
