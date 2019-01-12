import jwt = require('jsonwebtoken');
import { prisma, Prisma } from '../../prisma/generated/prisma-client';
import { ForbiddenError, UnauthorizedError } from '../errorTypes';
import { ROLE } from '../utils/customTypes';

//MOVE TO ENV
const SECRET = 'toReplaceSomeday';

export function sign(user) {
  return jwt.sign(
    { email: user.email, name: user.name, role: user.role, id: user.id },
    SECRET,
  );
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

export const checkUser = async (resolve, _, args, context, info) => {
  try {
    const { authorization } = context.request.request.headers;
    const token = authorization.replace('Bearer ', '');
    context.user = verify(token);
  } catch (error) {
    context.user = null;
  }
  return resolve(_, args, context, info);
};

function allowResource(context, roles) {
  if (!context.user || !context.user.role) {
    throw new UnauthorizedError();
  }
  const { role } = context.user;
  if (roles.some(el => el === role)) {
    return prisma;
  }
  throw new ForbiddenError();
}

export function allowUser(context): Prisma {
  return allowResource(context, [ROLE.USER]);
}

export function allowAdmin(context): Prisma {
  return allowResource(context, [ROLE.ADMIN, ROLE.OPERATOR, ROLE.USER]);
}

export function allowOperator(context): Prisma {
  return allowResource(context, [ROLE.OPERATOR, ROLE.USER]);
}
