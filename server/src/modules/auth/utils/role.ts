import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { ApiError } from '../../../utils/helpers/error';
import { JwtPayload } from '../../../utils/interfaces';

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export function authorizeRoles(roles: string[]) {
  return (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    console.log({ roles });
    if (!roles.includes((request.user as JwtPayload).role))
      throw new ApiError(
        400,
        'You cannot access this resource!'
      ).getErrorObject(reply);
    done();
  };
}
