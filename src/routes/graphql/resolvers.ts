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

    createUser: async (args: { dto: createUser }) => {
        const newUser = await prisma.user.create({
            data: args.dto,
        });
        return newUser;
    },

    changeUser: async (args: { id: UUID, dto: updateUser }) => {
        const updUser = await prisma.user.update({
            where: {
                id: args.id,
            },
            data: args.dto,
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

    createPost: async (args: { dto: createPost }) => {
        const newPost = await prisma.post.create({
            data: args.dto,
        });
        return newPost;
    },

    changePost: async (args: { id: UUID, dto: updatePost }) => {
        const updPost = await prisma.post.update({
            where: {
                id: args.id,
            },
            data: args.dto,
        });
        return updPost;
    },

    deletePost: async (args: { id: UUID }) => {
        await prisma.post.delete({
            where: {
                id: args.id
            },
        });
        return args.id;
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

    createProfile: async (args: { dto: createProfile }) => {
        const newProfile = await prisma.profile.create({
            data: args.dto,
        });
        return newProfile;
    },

    changeProfile: async (args: { id: UUID, dto: updateProfile }) => {
        const updProfile = await prisma.profile.update({
            where: {
                id: args.id,
            },
            data: args.dto,
        });
        return updProfile;
    },

    deleteProfile: async (args: { id: UUID }) => {
        await prisma.profile.delete({
            where: {
                id: args.id
            },
        });
        return args.id;
    },

    // SUBSCRIBES
    subscribeTo: async (args: { userId: UUID, authorId: UUID }) => {
        await prisma.user.update({
            where: {
                id: args.userId,
            },
            data: {
                userSubscribedTo: {
                    create: {
                        authorId: args.authorId,
                    },
                },
            },
        });
        return args.userId;
    },

    unsubscribeFrom: async (args: { userId: UUID, authorId: UUID }) => {
        await prisma.subscribersOnAuthors.delete({
            where: {
                subscriberId_authorId: {
                    subscriberId: args.userId,
                    authorId: args.authorId,
                },
            },
        });
        return args.userId;
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

type createPost = {
    title: string,
    content: string,
    authorId: string,
};

type updatePost = {
    title?: string,
    content?: string,
    authorId: string,
};

type createProfile = {
    isMale: boolean,
    yearOfBirth: number,
    userId: string,
    memberTypeId: string,
};

type updateProfile = {
    isMale?: boolean,
    yearOfBirth?: number,
    userId: string,
    memberTypeId?: string,
};