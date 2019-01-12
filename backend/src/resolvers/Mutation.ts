import bcrypt = require('bcrypt');
import { prisma } from '../../prisma/generated/prisma-client';
import { BadData } from '../errorTypes';
import { Context, ROLE } from '../utils/customTypes';
import { allowAdmin, sign } from '../services/auth';
import { validateEmail, validatePassword } from '../utils/validator';

const Mutation = {
    createContest(_, args, context: Context) {
        return allowAdmin(context).createContest({
            ...args
        });
    },
    async createUser(_, { data }, context: Context) {
        if (!validatePassword(data.password))
            throw new BadData({
                data: {
                    additional_info: 'Password must have at least 8 characters and contain: 1 upper case character, 1 lower case characterm, 1 number, 1 special character.'
                }
            })
        if (!validateEmail(data.email))
            throw new BadData({
                data: {
                    additional_info: 'Invalid email address.'
                }
            })
        const emailExists = await prisma.user({ email: data.email });
        if (emailExists)
            throw new BadData({
                data: {
                    additional_info: 'User with this email already exists.'
                }
            });
        const peselExists = await prisma.user({ pesel: data.pesel })
        if (peselExists)
            throw new BadData({
                data: {
                    additional_info: 'User with this pesel number already exists.'
                }
            });
        const passwordHash = await bcrypt.hash(data.password, 5);
        const user = await prisma.createUser({
            email: data.email.toLowerCase(),
            name: data.name,
            postalCode: data.postalCode,
            pesel: data.pesel,
            role: ROLE.USER,
            passwordHash
        })
        const token = sign(user);
        return { user, token };
    },
    async login(_, { data }, context: Context) {
        const user = await prisma.user({ email: data.email });
        if (!user) {
            throw new BadData({
                data: {
                    additional_info: 'Invalid credentials.'
                }
            });
        }
        const passwordCorrect = await bcrypt.compare(
            data.password,
            user.passwordHash,
        );
        if (!passwordCorrect)
            throw new BadData({
                data: {
                    additional_info: 'Invalid credentials.'
                }
            });
        const token = sign(user);
        return { token };
    }
}

export default Mutation;