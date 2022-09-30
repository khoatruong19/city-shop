import { ImageModel } from './others.model';

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: ImageModel;
  role: 'admin' | 'user' | 'creator';
  createdAt: string;
  updatedAt: string;
};
