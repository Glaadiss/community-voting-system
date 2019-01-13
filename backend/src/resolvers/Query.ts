import { allowAdmin, allowOperator, allowUser } from '../services/auth';
import { Context } from '../utils/customTypes';

const Query: any = {
  contests(_, args, context: Context) {
    return allowOperator(context).contests();
  },
  projects(_, args, context: Context) {
    return allowOperator(context).projects();
  },
  project(_, { projectId }, context: Context) {
    return allowOperator(context).project({ id: projectId });
  },
  contest(_, { contestId }, context) {
    return allowOperator(context).contest({ id: contestId });
  },
  users(_, args, context: Context) {
    return allowAdmin(context).users();
  },
};

export default Query;
