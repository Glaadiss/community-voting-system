import bcrypt = require('bcrypt');
import { prisma } from '../../prisma/generated/prisma-client';
import { BadData } from '../errorTypes';
import { Context, ROLE } from '../utils/customTypes';
import {
    allowAdmin,
    sign
} from '../services/auth';

const Mutation = {
    createContest(_, args, context: Context) {
        return allowAdmin(context).createContest({
            ...args
        });
    },
    async createUser(_, { data }, context: Context) {
        const passwordHash = await bcrypt.hash(data.password, 5);
        const user = await prisma.createUser({
            email: data.email,
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
            throw new BadData();
        }
        const passwordCorrect = await bcrypt.compare(
            data.password,
            user.passwordHash,
        );
        if (!passwordCorrect) {
            throw new BadData();
        }
        const token = sign(user);
        return { token };
    }
}

export default Mutation;