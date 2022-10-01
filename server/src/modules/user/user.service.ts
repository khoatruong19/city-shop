import { LoginUserBody, RegisterUserBody } from '../auth/auth.schema';
import { comparePassword, getResetToken } from '../auth/utils/password';
import { sendMail } from '../auth/utils/sendMail';
import { User, UserModel } from './user.model';
import * as crypto from 'crypto';
import {
  ResetPasswordInput,
  SendMailServiceInput,
  UpdatePasswordInput,
  UpdateProfileInput,
  UpdateRoleInput,
} from '../../utils/types';
import { Types } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

export async function createUser(
  input: RegisterUserBody
): Promise<User | null> {
  const { name, email, password, avatar } = input;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) return null;

  const myCloud = await cloudinary.uploader.upload(avatar, {
    folder: 'avatars',
  });

  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  return user;
}

export async function getAllUsers(): Promise<User[]> {
  return await UserModel.find();
}

export async function getUserById(
  userId: Types.ObjectId
): Promise<User | null> {
  return await UserModel.findById(userId).select('+password');
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await UserModel.findOne({ email });
}

export async function validateUser(input: LoginUserBody): Promise<User | null> {
  const { email, password } = input;
  console.log({ input });

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) return null;

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) return null;

  return user;
}

export async function sendResetPasswordMail(
  input: SendMailServiceInput
): Promise<boolean> {
  const { resetPasswordTime, resetPasswordToken, resetToken } = getResetToken();
  const { hostname, protocol, user } = input;

  user.resetPasswordTime = resetPasswordTime;
  user.resetPasswordToken = resetPasswordToken;

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${protocol}://${hostname}/password/reset/${resetToken}`;
  console.log({ resetPasswordUrl });

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
    return true;
  } catch (error) {
    user.resetPasswordTime = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return false;
  }
}

export async function resetPassword(
  input: ResetPasswordInput
): Promise<null | User> {
  const { tokenParam, newPassword } = input;

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(tokenParam)
    .digest('hex');

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: new Date() },
  });

  if (!user) return null;

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();
  return user;
}

export async function updatePassword({
  userId,
  oldPassword,
  newPassword,
}: UpdatePasswordInput): Promise<User | null> {
  const user = await getUserById(userId);
  if (!user) return null;

  const isPasswordMatched = await comparePassword(oldPassword, user.password);
  if (!isPasswordMatched) return null;

  user.password = newPassword;
  await user.save();

  return user;
}

export async function updateProfile(
  input: UpdateProfileInput
): Promise<User | null> {
  const { userId, avatar, ...rest } = input;

  let data = {};

  if (avatar !== '') {
    const user = await getUserById(userId);

    if (!user) return null;

    const imageId = user.avatar.public_id;

    await cloudinary.uploader.destroy(imageId);

    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });
    data = {
      ...rest,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };
  }

  const user = await UserModel.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) return null;

  return user;
}

export async function updateRole(input: UpdateRoleInput): Promise<User | null> {
  const { userId, ...rest } = input;
  const user = await UserModel.findByIdAndUpdate(userId, rest, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) return null;

  return user;
}

export async function deleteUserById(userId: Types.ObjectId): Promise<boolean> {
  const user = await UserModel.findById(userId);

  if (!user) return false;

  const imageId = user.avatar.public_id;

  await cloudinary.uploader.destroy(imageId);

  await user.remove();

  return true;
}
