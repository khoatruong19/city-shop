import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import mongoose from 'mongoose';
import { IResetPasswordBody, IUpdatePasswordBody } from '../interfaces';
import { ApiError } from './error';

export function validateMongoId(
    request: FastifyRequest<{
      Params: {
        id: mongoose.Types.ObjectId;
      };
    }>,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) {
    if (mongoose.isValidObjectId(request.params.id)) done();
    else
      throw new ApiError(
        400,
        'Resources not found with this id ...Invalid mongoID'
      ).getErrorObject(reply);
  }

export function checkMatchNewPassword(
  request: FastifyRequest<IResetPasswordBody>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  if (request.body.confirmPassword !== request.body.password) {
    throw new ApiError(
      400,
      'Password and confirm password not matched!'
    ).getErrorObject(reply);
  }
  done();
}

export function checkMatchOldPassword(
  request: FastifyRequest<IUpdatePasswordBody>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  if (request.body.confirmPassword !== request.body.oldPassword) {
    throw new ApiError(
      400,
      'Old password and confirm password not matched!'
    ).getErrorObject(reply);
  }
  done();
}
