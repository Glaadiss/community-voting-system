import bcrypt = require('bcrypt');
import { Context } from 'graphql-yoga/dist/types';
import { prisma } from '../../prisma/generated/prisma-client';
import { BadData } from '../errorTypes';
import { sign } from '../services/auth';
import { validateEmail, validatePassword } from './validator';

const badPasswordMsg =
  'Password must have at least 8 characters and contain: 1 upper case character,' +
  '1 lower case characterm, 1 number, 1 special character.';
const badEmailMsg = 'Invalid email address.';
const emailExistMsg = 'User with this email already exists.';

function createAccount({ createFunction, validators }) {
  return async (a, { data }, context: Context) => {
    if (!validatePassword(data.password)) {
      throw new BadData({
        data: {
          additional_info: badPasswordMsg,
        },
      });
    }
    if (!validateEmail(data.email)) {
      throw new BadData({
        data: {
          additional_info: badEmailMsg,
        },
      });
    }
    const emailExists = await prisma.user({ email: data.email });
    if (emailExists) {
      throw new BadData({
        data: {
          additional_info: emailExistMsg,
        },
      });
    }
    const passwordHash = await bcrypt.hash(data.password, 5);
    const common = {
      email: data.email.toLowerCase(),
      passwordHash,
    };

    validators.forEach(async validator => {
      await validator(data);
    });

    const user = await createFunction({ context, data, common });

    const token = sign(user);
    return { user, token };
  };
}

export { createAccount };
