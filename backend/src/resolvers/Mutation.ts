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
<<<<<<< HEAD
    createProject(_, args, context: Context) {
        return allowOperator(context).createProject({
            ...args.data,
        });
=======
    async createAdmin(_, { data }, context: Context) {
        if (!validatePassword(data.password))
            throw new BadData({
                data: {
                    additional_info: 'Password must have at least 8 characters and contain: 1 upper case character, 1 lower case characterm, 1 number, 1 special character.'
                }
            });
        if (!validateEmail(data.email))
            throw new BadData({
                data: {
                    additional_info: 'Invalid email address.'
                }
            });
        const emailExists = await prisma.user({ email: data.email });
        if (emailExists)
            throw new BadData({
                data: {
                    additional_info: 'User with this email already exists.'
                }
            });
        const passwordHash = await bcrypt.hash(data.password, 5);
        const user = await allowAdmin(context).createUser({
            email: data.email.toLowerCase(),
            role: ROLE.ADMIN,
            passwordHash
        });
        const token = sign(user);
        return { user, token };
    },
    async createOperator(_, { data }, context: Context) {
        if (!validatePassword(data.password))
            throw new BadData({
                data: {
                    additional_info: 'Password must have at least 8 characters and contain: 1 upper case character, 1 lower case characterm, 1 number, 1 special character.'
                }
            });
        if (!validateEmail(data.email))
            throw new BadData({
                data: {
                    additional_info: 'Invalid email address.'
                }
            });
        const emailExists = await prisma.user({ email: data.email });
        if (emailExists)
            throw new BadData({
                data: {
                    additional_info: 'User with this email already exists.'
                }
            });
        const passwordHash = await bcrypt.hash(data.password, 5);
        const user = await allowAdmin(context).createUser({
            email: data.email.toLowerCase(),
            name: data.name,
            role: ROLE.OPERATOR,
            passwordHash
        });
        const token = sign(user);
        return { user, token };
>>>>>>> Added user to authPayload
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
<<<<<<< HEAD
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

=======
            });
        const passwordHash = await bcrypt.hash(data.password, 5);
        const user = await prisma.createUser({
            email: data.email.toLowerCase(),
            name: data.name,
            postalCode: data.postalCode,
            pesel: data.pesel,
            role: ROLE.USER,
            passwordHash
        });
        const token = sign(user);
        return { user, token };
    },
>>>>>>> Added user to authPayload
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
