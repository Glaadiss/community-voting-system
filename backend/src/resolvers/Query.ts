import { allowAdmin, allowUser } from '../services/auth';
import { Context } from '../utils/customTypes';
import { isOperatorAllowed, isUserAllowed } from '../utils/authHelpers';
import { BadData, ForbiddenError } from '../errorTypes';
import {
  projectNotFoundErrorMessage,
  contestNotFoundErrorMessage
} from '../utils/errorMessages';
import { prisma } from '../../prisma/generated/prisma-client';

const Query: any = {
  contests(_, args, context: Context, info) {
    const opArgs: any = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (!isOperatorAllowed(context)) {
      opArgs.where = {
        isPublished: true
      };
    }
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          description_contains: args.query
        }
      ];
    }
    return allowUser(context).query.contests(opArgs, info);
  },

  async contestVotes(_, args, context: Context, info) {
    const projects = await allowUser(context).query.projects({
      where: {
        contests_some: {
          id: args.id
        }
      }
    });

    const votes: any = await Promise.all(
      projects.map(project =>
        allowUser(context).query.votes({
          where: {
            project: {
              id: project.id
            }
          }
        })
      )
    );

    return projects.map((el, i) => ({
      projectId: el.id,
      count: votes[i].length
    }));
  },

  async projectWhichUserVotesInContest(_, args, context: Context, info) {
    const vote = await allowUser(context).query.votes({
      where: {
        contests_some: {
          id: args.id
        },
        user: {
          id: context.user.id
        }
      }
    });

    const projects = await allowUser(context).query.projects({
      where: {
        vote: {
          id: vote.id
        }
      }
    });

    return projects[0];
  },

  async contest(_, args, context: Context, info) {
    const opArgs: any = {
      where: {
        id: args.id
      }
    };
    const contest = await allowUser(context).query.contest(opArgs, info);
    if (!isOperatorAllowed(context) && !contest.isPublished) {
      throw new BadData({
        data: {
          additional_info: contestNotFoundErrorMessage
        }
      });
    }
    return contest;
  },
  users(_, args, context: Context, info) {
    const opArgs: any = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query) {
      opArgs.where.name_contains = args.query;
    }
    return allowAdmin(context).query.users(opArgs, info);
  },
  user(_, args, context: Context, info) {
    if (
      !isUserAllowed(context) ||
      (context.user.id !== args.id && !isOperatorAllowed(context))
    ) {
      throw new ForbiddenError();
    }
    return allowUser(context).query.user({ where: { id: args.id } }, info);
  },
  projects(_, args, context: Context, info) {
    const opArgs: any = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (!isOperatorAllowed(context)) {
      opArgs.where = {
        isPublished: true
      };
    }
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          description_contains: args.query
        }
      ];
    }
    return allowUser(context).query.projects(opArgs, info);
  },
  async project(_, args, context: Context, info) {
    const opArgs: any = {
      where: {
        id: args.id
      }
    };
    const project = await allowUser(context).query.project(opArgs, info);
    if (!isOperatorAllowed(context) && !project.isPublished) {
      throw new BadData({
        data: {
          additional_info: projectNotFoundErrorMessage
        }
      });
    }
    return project;
  }
};

export default Query;
