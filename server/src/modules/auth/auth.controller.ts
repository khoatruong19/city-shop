import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiError } from '../../utils/helpers/error';
import { IRequestWithUserId, JwtPayload } from '../../utils/interfaces';
import { logger } from '../../utils/logger';
import { User } from '../user/user.model';
import {
  createUser,
  getUserByEmail,
  getUserById,
  resetPassword,
  sendResetPasswordMail,
  updatePassword,
  updateProfile,
  validateUser,
} from '../user/user.service';
import {
  ForgotPasswordBody,
  LoginUserBody,
  RegisterUserBody,
  ResetPasswordBody,
  ResetPasswordParams,
  UpdatePasswordBody,
  UpdateProfileBody,
} from './auth.schema';
import { sendToken } from './utils/jwt';

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: RegisterUserBody;
  }>,
  reply: FastifyReply
) {
  try {
    const user = await createUser(request.body);
    if (!user) {
      throw new ApiError(400, 'Already exist email!').getErrorObject(reply);
    }

    await sendToken(user, 201, reply);
  } catch (error) {
    logger.error(`Register user error, ${error}`);
  }
}

export async function loginUserHandler(
  request: FastifyRequest<{
    Body: LoginUserBody;
  }>,
  reply: FastifyReply
) {
  try {
    const user = await validateUser(request.body);
    if (!user) {
      throw new ApiError(400, 'Invalid credential!').getErrorObject(reply);
    }

    await sendToken(user, 200, reply);
  } catch (error) {
    logger.error(`Login user error, ${error}`);
    throw new ApiError(400, 'Login user error').getErrorObject(reply);
  }
}

export async function logoutUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    reply.setCookie('token', '', {
      expires: new Date(),
    });
    reply.send({
      message: 'Logout successfully!',
    });
  } catch (error) {
    logger.error(`Logout user error, ${error}`);
    throw new ApiError(400, 'Logout user error').getErrorObject(reply);
  }
}

export async function forgotPasswordHandler(
  request: FastifyRequest<{
    Body: ForgotPasswordBody;
  }>,
  reply: FastifyReply
) {
  try {
    const user = await getUserByEmail(request.body.email);

    if (!user) {
      throw new ApiError(400, 'Invalid credential!').getErrorObject(reply);
    }

    const sentResetPasswordMail = await sendResetPasswordMail({
      user,
      protocol: request.protocol,
      hostname: request.hostname,
    });

    if (!sentResetPasswordMail)
      throw new ApiError(400, 'Reset password fail!').getErrorObject(reply);

    reply.send({
      success: true,
      message: 'Sent reset password mail!',
    });
  } catch (error) {
    logger.error(`Forgot password handler error, ${error}`);
    throw new ApiError(400, 'Forgot password handler error').getErrorObject(
      reply
    );
  }
}

export async function resetPasswordHandler(
  request: FastifyRequest<{
    Body: ResetPasswordBody;
    Params: ResetPasswordParams;
  }>,
  reply: FastifyReply
) {
  try {
    const user = await resetPassword({
      tokenParam: request.params.token,
      newPassword: request.body.password,
    });

    if (!user) throw new ApiError(400, 'Token has expired or no user exists!');

    reply.send({
      message: 'Sent reset password mail!',
      user,
    });
  } catch (error) {
    logger.error(`Reset password handler error, ${error}`);
    throw new ApiError(400, 'Reset password handler error').getErrorObject(
      reply
    );
  }
}

export async function meHandler(request: FastifyRequest, reply: FastifyReply) {
  const userId = (request.user as JwtPayload).id;
  const user = await getUserById(userId);
  if (!user) throw new ApiError(400, 'No user exist!').getErrorObject(reply);
  reply.send({
    message: 'Get user info success!',
    user,
  });
}

export async function updatePasswordHandler(
  request: FastifyRequest<{
    Body: UpdatePasswordBody;
  }>,
  reply: FastifyReply
) {
  try {
    const userId = (request.user as JwtPayload).id;
    const { newPassword, oldPassword } = request.body;
    const user = await updatePassword({
      userId,
      newPassword,
      oldPassword,
    });
    if (!user)
      throw new ApiError(400, 'Old password is wrong').getErrorObject(reply);
    await sendToken(user, 200, reply);
  } catch (error) {
    logger.error(`Update password handler error, ${error}`);
    throw new ApiError(400, 'Update password handler error').getErrorObject(
      reply
    );
  }
}

export async function updateProfileHandler(
  request: FastifyRequest<{
    Body: UpdateProfileBody;
  }>,
  reply: FastifyReply
) {
  try {
    const userId = (request.user as JwtPayload).id;

    const { email } = request.body;

    const existingEmailUser = await getUserByEmail(email);
    if (existingEmailUser && existingEmailUser.id !== userId)
      throw new ApiError(400, 'Email already exists').getErrorObject(reply);

    const user = await updateProfile({
      userId,
      ...request.body,
    });
    if (!user) throw new ApiError(400, 'User not exist').getErrorObject(reply);
    reply.send({
      message: 'Update user info success!',
      user,
    });
  } catch (error) {
    logger.error(`Update profile handler error, ${error}`);
    throw new ApiError(400, 'Update profile handler error').getErrorObject(
      reply
    );
  }
}
