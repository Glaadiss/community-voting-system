import bcrypt = require('bcrypt');
import { Context } from 'graphql-yoga/dist/types';
import { prisma } from '../prisma';
import { BadData } from '../errorTypes';
import { sign } from '../services/auth';
import { validateEmail, validatePassword } from './validator';
import { badPasswordMessage, badEmailMessage, emailExistsErrorMessage } from './errorMessages';

function createAccount({ createFunction, validators }) {
  return async (parent, { data }, context: Context) => {
    if (!validatePassword(data.password)) {
      throw new BadData({
        data: {
          additional_info: badPasswordMessage,
        },
      });
    }
    if (!validateEmail(data.email)) {
      throw new BadData({
        data: {
          additional_info: badEmailMessage,
        },
      });
    }
    const emailExists = await prisma.query.user({ where: { email: data.email } });
    if (emailExists) {
      throw new BadData({
        data: {
          additional_info: emailExistsErrorMessage,
        },
      });
    }
    const passwordHash = await bcrypt.hash(data.password, 5);
    const common = {
      email: data.email.toLowerCase(),
      passwordHash,
    };

    for await (const validator of validators) {
      await validator(data);
    };

    const user = await createFunction({ context, data, common });

    const token = sign(user);
    return { user, token };
  };
}

export { createAccount };
