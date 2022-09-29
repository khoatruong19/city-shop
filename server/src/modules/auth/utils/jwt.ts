import { Types } from 'mongoose';
import server from '../../../app';
import { config } from '../../../utils/config';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { User } from '../../user/user.model';
import { ApiError } from '../../../utils/helpers/error';
import { JwtPayload } from '../../../utils/interfaces';

export async function getJwtToken(
  userId: Types.ObjectId,
  name: string,
  role: string
) {
  console.log({ name });
  return (await server).jwt.sign(
    { id: userId, name, role },
    { expiresIn: config.JWT_EXPIRES }
  );
}

export async function sendToken(
  user: User,
  statusCode: number,
  reply: FastifyReply
) {
  const token = await getJwtToken(user._id, user.name, user.role);

  reply
    .status(statusCode)
    .setCookie('token', token, {
      expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
      httpOnly: true,
      sameSite: 'lax',
    })
    .send({
      message:
        statusCode === 200
          ? 'Login user successfully!'
          : 'Register user successfully!',
      user,
      token,
    });
}

export async function verifyJWT(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  const { token } = request.cookies;
  if (!token)
    throw new ApiError(400, 'Not authenticated').getErrorObject(reply);
  const userPayload = (await server).jwt.verify(token) as JwtPayload;
  if (!userPayload.id)
    throw new ApiError(400, 'Not authenticated').getErrorObject(reply);
  request.user = {
    id: userPayload.id,
    name: userPayload.name,
    role: userPayload.role,
  } as JwtPayload;
  console.log(request.user);
  done();
}
