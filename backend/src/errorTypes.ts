import { createError } from 'apollo-errors';

enum ERROR {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_DATA = 'BAD_DATA',
}

export const UnauthorizedError = createError(ERROR.UNAUTHORIZED, {
  message: 'Login in order to use this feature.',
});

export const ForbiddenError = createError(ERROR.FORBIDDEN, {
  message: 'Nie masz uprawnien do tych zasobów.',
});

export const BadData = createError(ERROR.BAD_DATA, {
  message: 'Wprowadzono niepoprawne dane.',
});
