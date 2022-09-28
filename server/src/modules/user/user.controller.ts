import { FastifyReply, FastifyRequest } from 'fastify';
import mongoose from 'mongoose';
import { ApiError } from '../../utils/helpers/error';
import { logger } from '../../utils/logger';
import { updateUserRoleBody } from './user.schema';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateRole,
} from './user.service';

export async function getAllUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await getAllUsers();
    return reply.status(200).send({
      message: 'Get all users successfully!',
      users,
    });
  } catch (error) {
    logger.info(`Get all users error, `, error);
    throw new ApiError(400, 'Get all users error!').getErrorObject(reply);
  }
}

export async function getSingleUserHandler(
  request: FastifyRequest<{
    Params: {
      id: mongoose.Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const user = await getUserById(request.params.id);
    if (!user) throw new ApiError(400, 'User not found!').getErrorObject(reply);

    return reply.status(200).send({
      message: 'Get user detail successfully!',
      user,
    });
  } catch (error) {
    logger.info(`Get user detail error, `, error);
    throw new ApiError(400, 'Get user detail error!').getErrorObject(reply);
  }
}

export async function updateUserRoleHandler(
  request: FastifyRequest<{
    Params: {
      id: mongoose.Types.ObjectId;
    };
    Body: updateUserRoleBody;
  }>,
  reply: FastifyReply
) {
  try {
    const user = await updateRole({
      userId: request.params.id,
      ...request.body,
    });
    if (!user) throw new ApiError(400, 'User not found!').getErrorObject(reply);

    return reply.status(200).send({
      message: 'Update user role successfully!',
      user,
    });
  } catch (error) {
    logger.info(`Update user role error, `, error);
    throw new ApiError(400, 'Update user role error!').getErrorObject(reply);
  }
}

export async function deleteUserHandler(
  request: FastifyRequest<{
    Params: {
      id: mongoose.Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const userDeleted = await deleteUserById(request.params.id);
    if (!userDeleted)
      throw new ApiError(400, 'User not found!').getErrorObject(reply);

    return reply.status(200).send({
      message: 'Delete user successfully!',
    });
  } catch (error) {
    logger.info(`Delete user error, `, error);
    throw new ApiError(400, 'Delete user error!').getErrorObject(reply);
  }
}
