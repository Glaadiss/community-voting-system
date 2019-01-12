import { Context } from '../utils/customTypes';
import {
    allowAdmin,
    allowUser,
} from '../services/auth';

const Query: any = {
    contests(_, { }, context: Context, info) {
        return allowUser(context).contests();
    },
    contest(_, { contestId }, context) {
        return allowUser(context).contest({ id: contestId });
    },
    users(_, args, context: Context) {
        return allowAdmin(context).users();
    },
}

export default Query;