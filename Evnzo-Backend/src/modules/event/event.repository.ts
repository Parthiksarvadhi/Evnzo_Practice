import { prisma } from '@db/prisma';

export const createEvent = async (data: any) => {
    return prisma.event.create({
        data,
    });
};

export const getEvents = async () => {
    return prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
    });
};

export const getEventById = async (id: string) => {
    return prisma.event.findUnique({
        where: { id },
    });
};
