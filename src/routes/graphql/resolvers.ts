import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const rootValue = {
    user: async (id: string) => {
        return await prisma.user.findFirst({
            where: {
                id,
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

    updateUser: async (id: string, user: updateUser) => {
        const updUser = await prisma.user.update({
            where: {
                id,
            },
            data: user,
        });
        return updUser;
    },

    deleteUser: async (id: string) => {
        await prisma.user.delete({
            where: {
                id
            },
        });
        return id;
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