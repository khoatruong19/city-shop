import {
  getModelForClass,
  prop,
  pre,
  DocumentType,
  ReturnModelType,
  modelOptions,
} from '@typegoose/typegoose';
import validator from 'validator';
import { Image } from '../../utils/helpers/image';
import * as bcrypt from 'bcrypt';
import server from '../../app';
import { config } from '../../utils/config';
import { Document, Types } from 'mongoose';

@pre<User>('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
})
@modelOptions({ schemaOptions: { id: true } })
export class User extends Document {
  @prop({
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [20, 'Name can not exceed 20 characters'],
    minlength: [3, 'Name can not less 3 characters'],
  })
  name: string;

  @prop({
    type: String,
    unique: true,
    required: [true, 'Please enter your email'],
    validate: [validator.isEmail, 'Please enter a valid email'],
  })
  email: string;

  @prop({
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [3, 'Password should be greater than 2'],
    select: false,
  })
  password: string;

  @prop({ type: () => Image })
  avatar: Image;

  @prop({
    type: String,
    default: 'user',
  })
  role: string;

  @prop({
    type: String,
  })
  resetPasswordToken: string | undefined;

  @prop({
    type: Date,
  })
  resetPasswordTime: Date | undefined;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
