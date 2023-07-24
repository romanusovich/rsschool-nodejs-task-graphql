import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';

const prisma = new PrismaClient();

export const rootValue = {
    // USER
    user: async (args: { id: UUID }) => {
        return await prisma.user.findUnique({
            where: {
                id: args.id,
            }
        });
    },

    users: async () => {
        return await prisma.user.findMany();
    },

    createUser: async (user: createUser) => {
        const newUser = await prisma.user.create({
            data: user,
        });
        return newUser;
    },

    updateUser: async (args: { id: UUID, user: updateUser }) => {
        const updUser = await prisma.user.update({
            where: {
                id: args.id,
            },
            data: args.user,
        });
        return updUser;
    },

    deleteUser: async (args: { id: UUID }) => {
        await prisma.user.delete({
            where: {
                id: args.id
            },
        });
        return args.id;
    },

    // POST
    post: async (args: { id: UUID }) => {
        return await prisma.post.findUnique({
            where: {
                id: args.id,
            }
        });
    },

    posts: async () => {
        return await prisma.post.findMany();
    },

    // MEMBER
    memberType: async (args: { id: string }) => {
        return await prisma.memberType.findUnique({
            where: {
                id: args.id,
            }
        });
    },

    memberTypes: async () => {
        return await prisma.memberType.findMany();
    },

    // PROFILE
    profile: async (args: { id: UUID }) => {
        return await prisma.profile.findUnique({
            where: {
                id: args.id,
            }
        });
    },

    profiles: async () => {
        return await prisma.profile.findMany();
    },
};

type createUser = {
    name: string,
    balance: number
};

type updateUser = {
    name?: string,
    balance?: number
};