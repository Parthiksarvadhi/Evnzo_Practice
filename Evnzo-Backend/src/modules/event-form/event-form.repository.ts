import { prisma } from '@db/prisma';
import type { Prisma } from '@prisma/client';

export const createEventForm = async (data: Prisma.EventFormCreateInput) => {
    return prisma.eventForm.create({
        data,
        include: {
            fields: true,
        },
    });
};

export const findEventFormById = async (id: string) => {
    return prisma.eventForm.findUnique({
        where: { id },
        include: {
            fields: {
                orderBy: { order: 'asc' },
            },
            event: true,
        },
    });
};

export const findActiveEventForm = async (eventId: string, target: 'VISITOR' | 'EXHIBITOR') => {
    return prisma.eventForm.findFirst({
        where: {
            eventId,
            target,
            isActive: true,
        },
        include: {
            fields: {
                orderBy: { order: 'asc' },
            },
        },
    });
};

export const updateEventForm = async (id: string, data: Prisma.EventFormUpdateInput) => {
    return prisma.eventForm.update({
        where: { id },
        data,
        include: {
            fields: true,
        },
    });
};

export const deleteEventForm = async (id: string) => {
    return prisma.eventForm.delete({
        where: { id },
    });
};
