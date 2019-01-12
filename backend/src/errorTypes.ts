import { createError } from 'apollo-errors';

enum ERROR {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_DATA = 'BAD_DATA',
}

export const UnauthorizedError = createError(ERROR.UNAUTHORIZED, {
  message: 'Login in order to use the dashboard.',
});

export const ForbiddenError = createError(ERROR.FORBIDDEN, {
  message: 'You don\'t have permission to view this assets.',
});

export const BadData = createError(ERROR.BAD_DATA, {
  message: 'Invalid data.',
});
