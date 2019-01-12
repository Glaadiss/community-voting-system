import bcrypt = require('bcrypt');
import { prisma } from '../../prisma/generated/prisma-client';
import { BadData } from '../errorTypes';
import { allowAdmin, allowOperator, sign } from '../services/auth';
import { createAccount } from '../utils/createAccount';
import { Context, ROLE } from '../utils/customTypes';

const Mutation = {
    createContest(_, args, context: Context) {
        return allowOperator(context).createContest({
            ...args.data,
        });
    },
    createProject(_, args, context: Context) {
        return allowOperator(context).createProject({
            ...args.data,
        });
    },
    createAdmin: createAccount({
        createFunction: ({ context, data, common }) =>
            allowAdmin(context).createUser({
                ...common,
                role: ROLE.ADMIN,
            }),
        validators: [],
    }),

    createOperator: createAccount({
        createFunction: ({ context, data, common }) =>
            allowAdmin(context).createUser({
                ...common,
                name: data.name,
                role: ROLE.OPERATOR,
            }),
        validators: [],
    }),

    createUser: createAccount({
        createFunction: ({ context, data, common }) =>
            allowOperator(context).createUser({
                ...common,
                name: data.name,
                pesel: data.pesel,
                postalCode: data.postalCode,
                role: ROLE.OPERATOR,
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
