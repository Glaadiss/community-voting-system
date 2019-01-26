import bcrypt = require('bcrypt');
import { Context } from 'graphql-yoga/dist/types';

import { BadData, ForbiddenError } from '../errorTypes';
import { validatePassword, validateEmail } from './validator';
import { badPasswordMessage } from './errorMessages';
import { isAdminAllowed, isUserAllowed } from './authHelpers';

function updateAccount({ updateFunction, validators }) {
  return async (parent, { data, where }, context: Context, info) => {
    if (
      !isUserAllowed(context) ||
      (!isAdminAllowed(context) &&
        !(where.id === context.user.id || where.email === context.user.email))
    ) {
      throw new ForbiddenError();
    }

    const common: any = {};

    if (data.password) {
      if (!validatePassword(data.password)) {
        throw new BadData({
          data: {
            additional_info: badPasswordMessage
          }
        });
      } else {
        const passwordHash = await bcrypt.hash(data.password, 5);
        common.passwordHash = passwordHash;
      }
    }

    if (data.email) {
      await validateEmail(data.email);
      common.email = data.email.toLowerCase();
    }

    for await (const validator of validators) {
      await validator(data);
    }

    const user = await updateFunction({ context, data, common, where, info });
    delete user.password;
    return user;
  };
}

export { updateAccount };
