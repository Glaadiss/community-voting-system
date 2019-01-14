import bcrypt = require('bcrypt');
import { prisma } from '../prisma';
import { BadData } from '../errorTypes';
import { allowAdmin, allowOperator, sign } from '../services/auth';
import { createAccount } from '../utils/createAccount';
import { Context, ROLE } from '../utils/customTypes';

const invalidCredentialsMsg = 'Invalid credentials.';
const peselExistsMsg = 'User with this pesel number already exists.';

const Mutation = {
    async createProject(_, args, context: Context, info) {
        let input = {
            data: {
                ...args.data
            }
        }
        if (args.data.contest)
            input.data.contests = {
                connect: {
                    id: args.data.contest
                }
            }
        return allowOperator(context).mutation.createProject(input, info);
    },
    async createContest(_, args, context: Context, info) {
        let input = {
            data: {
                ...args.data
            }
        }
        let projectIds = [];
        if (args.data.projects) {
            projectIds = args.data.projects.map(element => {
                return {
                    id: element
                }
            });
            input.data.projects = {
                connect: projectIds
            }
        }
        return allowOperator(context).mutation.createContest(input, info);
    },
    createAdmin: createAccount({
        createFunction: ({ context, data, common }) =>
            allowAdmin(context).mutation.createUser({
                ...common,
                role: ROLE.ADMIN,
            }),
        validators: [],
    }),

    createOperator: createAccount({
        createFunction: ({ context, data, common }) =>
            allowAdmin(context).mutation.createUser({
                ...common,
                name: data.name,
                role: ROLE.OPERATOR,
            }),
        validators: [],
    }),

    createUser: createAccount({
        createFunction: ({ context, data, common }) =>
            prisma.mutation.createUser({
                ...common,
                name: data.name,
                pesel: data.pesel,
                postalCode: data.postalCode,
                role: ROLE.USER,
            }),
        validators: [
            async data => {
                const peselExists = await prisma.query.user({ pesel: data.pesel });
                if (peselExists) {
                    throw new BadData({
                        data: {
                            additional_info: peselExistsMsg,
                        },
                    });
                }
            }
        ],
    }),

    async login(_, { data }, context: Context) {
        const user = await prisma.query.user({ email: data.email });
        if (!user) {
            throw new BadData({
                data: {
                    additional_info: invalidCredentialsMsg,
                },
            });
        }
        const passwordCorrect = await bcrypt.compare(
            data.password,
            user.passwordHash,
        );
        if (!passwordCorrect) {
            throw new BadData({
                data: {
                    additional_info: invalidCredentialsMsg,
                },
            });
        }
        const token = sign(user);
        return {
            token,
            user: { role: user.role, name: user.name, email: user.email },
        };
    },
};

export default Mutation;
