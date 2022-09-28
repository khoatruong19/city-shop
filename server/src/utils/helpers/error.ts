import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

enum ErrorTypes {
  'OK' = 200,
  'Created' = 200,
  'Bad Request' = 400,
  'Not found' = 404,
}

export class ApiError extends Error {
  status = 400;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }

  getErrorObject(reply: FastifyReply) {
    return reply.status(this.status).send({
      statusCode: this.status,
      error: ErrorTypes[this.status],
      message: this.message,
    });
  }
}
