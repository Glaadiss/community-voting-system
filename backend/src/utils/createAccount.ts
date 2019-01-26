import bcrypt = require('bcrypt');
import { Context } from 'graphql-yoga/dist/types';
import { BadData } from '../errorTypes';
import { sign } from '../services/auth';
import { validatePassword, validateEmail } from './validator';
import { badPasswordMessage } from './errorMessages';

function createAccount({ createFunction, validators }) {
  return async (parent, { data }, context: Context) => {
    if (!validatePassword(data.password)) {
      throw new BadData({
        data: {
          additional_info: badPasswordMessage
        }
      });
    }

    await validateEmail(data.email);

    const passwordHash = await bcrypt.hash(data.password, 5);
    const common = {
      email: data.email.toLowerCase(),
      passwordHash
    };

    for await (const validator of validators) {
      await validator(data);
    }

    const user = await createFunction({ context, data, common });

    const token = sign(user);
    return { user, token };
  };
}

export { createAccount };
