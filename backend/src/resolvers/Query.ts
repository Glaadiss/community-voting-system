import { allowAdmin, allowOperator, allowUser } from '../services/auth';
import { Context } from '../utils/customTypes';
import {
    allowAdmin,
    allowUser
} from '../services/auth';
import { isOperatorAllowed } from '../utils/authHelpers';
import { BadData } from '../errorTypes';

const Query: any = {
    contests(_, args, context: Context, info) {
        const opArgs: any = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        if (!isOperatorAllowed(context))
            opArgs.where = {
                isPublished: true
            }
        if (args.query)
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                description_contains: args.query
            }]
        return allowUser(context).query.contests(opArgs, info);
    },
    async contest(_, args, context: Context, info) {
        let opArgs: any = {
            where: {
                id: args.id
            }
        }
        const contest = await allowUser(context).query.contest(opArgs, info);
        if (!isOperatorAllowed(context) && !contest.isPublished)
            throw new BadData({
                data: {
                    additional_info: 'Contest not found.'
                }
            });
        return contest;
    },
    users(_, args, context: Context, info) {
        const opArgs: any = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        if (args.query)
            opArgs.where.name_contains = args.query;
        return allowAdmin(context).query.users(opArgs, info);
    },
    projects(_, args, context: Context, info) {
        const opArgs: any = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        if (!isOperatorAllowed(context))
            opArgs.where = {
                isPublished: true
            }
        if (args.query)
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                description_contains: args.query
            }]
        return allowUser(context).query.projects(opArgs, info);
    },
    async project(_, args, context: Context, info) {
        let opArgs: any = {
            where: {
                id: args.id
            }
        }
        const project = await allowUser(context).query.project(opArgs, info);
        if (!isOperatorAllowed(context) && !project.isPublished)
            throw new BadData({
                data: {
                    additional_info: 'Project not found.'
                }
            });
        return project;
    }
}

export default Query;
