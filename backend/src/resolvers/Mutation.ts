import bcrypt = require('bcrypt');
import { prisma } from '../../prisma/generated/prisma-client';
import { BadData } from '../errorTypes';
import { allowAdmin, allowOperator, sign } from '../services/auth';
import { createAccount } from '../utils/createAccount';
import { Context, ROLE } from '../utils/customTypes';

const Mutation = {
    createContest(_, args, context: Context) {
        return allowOperator(context).mutation.createContest({
            ...args.data,
        });
    },
    createProject(_, args, context: Context) {
        return allowOperator(context).mutation.createProject({
            ...args.data,
        });
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
            allowOperator(context).mutation.createUser({
                ...common,
                name: data.name,
                pesel: data.pesel,
                postalCode: data.postalCode,
                role: ROLE.USER,
            }),
        validators: [
            async data => {
                const peselExists = await prisma.user({ pesel: data.pesel });
                if (peselExists) {
                    throw new BadData({
                        data: {
                            additional_info: 'User with this pesel number already exists.',
                        },
                    });
                }
            },
            async data => {
                const emailExists = await prisma.user({ email: data.email });
                if (emailExists)
                    throw new BadData({
                        data: {
                            additional_info: 'User with this email already exists.'
                        }
                    });
            },
            async data => {

            }
        ],
    }),

    async login(_, { data }, context: Context) {
        const user = await prisma.user({ email: data.email });
        if (!user) {
            throw new BadData({
                data: {
                    additional_info: 'Invalid credentials.',
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
                    additional_info: 'Invalid credentials.',
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
