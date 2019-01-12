import { Context } from '../utils/customTypes';
import {
    allowAdmin,
    createUser,
    login
} from '../services/auth';

const Mutation = {
    createContest(_, { name }, context: Context) {
        return allowAdmin(context).createContest({
            name,
        });
    },
    createUser,
    login,
}

export default Mutation;