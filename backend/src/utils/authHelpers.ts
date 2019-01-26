import { ROLE } from './customTypes';

export const isUserAllowed = context => {
  return isRoleAllowed(context, [ROLE.USER, ROLE.OPERATOR, ROLE.ADMIN]);
};

export const isOperatorAllowed = context => {
  return isRoleAllowed(context, [ROLE.OPERATOR, ROLE.ADMIN]);
};

export const isAdminAllowed = context => {
  return isRoleAllowed(context, [ROLE.ADMIN]);
};

const isRoleAllowed = (context, roles) => {
  if (!context.user || !context.user.role) {
    return false;
  }
  const { role } = context.user;
  if (roles.some(el => el === role)) {
    return true;
  }
  return false;
};
