import { createError } from 'apollo-errors';
import { unauthorizedErrorMessage, accessForbiddenErrorMessage, badDataErrorMessage } from './utils/errorMessages';

enum ERROR {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_DATA = 'BAD_DATA',
}

export const UnauthorizedError = createError(ERROR.UNAUTHORIZED, {
  message: unauthorizedErrorMessage
});

export const ForbiddenError = createError(ERROR.FORBIDDEN, {
  message: accessForbiddenErrorMessage
});

export const BadData = createError(ERROR.BAD_DATA, {
  message: badDataErrorMessage
});
