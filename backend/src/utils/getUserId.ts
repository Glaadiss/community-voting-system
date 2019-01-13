import jwt from 'jsonwebtoken';

export const getUserId = (request) => {
    const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;
    if (header) {
        const token = header.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'toReplaceSomeday');
        return decoded.userId;
    }
    return null;
}