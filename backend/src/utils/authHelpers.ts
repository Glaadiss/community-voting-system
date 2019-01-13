import { ROLE } from './customTypes';

export const isUserAllowed = (context) => {
    if (!context.user || !context.user.role) {
        return false
    }
    const rolesAllowed = [ROLE.USER, ROLE.OPERATOR, ROLE.ADMIN];
    const { role } = context.user;
    if (rolesAllowed.some(el => el === role)) {
        return true;
    }
    return false
}

export const isOperatorAllowed = (context) => {
    if (!context.user || !context.user.role) {
        return false
    }
    const rolesAllowed = [ROLE.OPERATOR, ROLE.ADMIN];
    const { role } = context.user;
    if (rolesAllowed.some(el => el === role)) {
        return true;
    }
    return false
}

export const isAdminAllowed = (context) => {
    if (!context.user || !context.user.role) {
        return false
    }
    const rolesAllowed = [ROLE.ADMIN];
    const { role } = context.user;
    if (rolesAllowed.some(el => el === role)) {
        return true;
    }
    return false
}