import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
import { prisma, Prisma } from '../../generated/prisma-client';
import { BadData, ForbiddenError, UnauthorizedError } from '../errorTypes';
import { Context } from '../index';
const SECRET = 'toReplaceSomeday';
enum ROLE {
  USER = 'user',
  OPERATOR = 'operator',
  ADMIN = 'admin',
}

export async function createUser(_, args, context: Context) {
  const passwordHash = await bcrypt.hash(args.password, 5);
  const user = await prisma.createUser({
    email: args.email,
    passwordHash,
    name: args.name,
    role: ROLE.USER,
  });
  const token = sign(user);
  return { user, token };
}

export async function login(_, args, context: Context) {
  const user = await prisma.user({ email: args.email });
  if (!user) {
    throw new BadData();
  }
  const passwordCorrect = await bcrypt.compare(
    args.password,
    user.passwordHash,
  );
  if (!passwordCorrect) {
    throw new BadData();
  }
  const token = sign(user);
  return { user, token };
}

function sign(user) {
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
  console.log(context.user);
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
