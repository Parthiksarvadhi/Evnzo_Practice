import { AppError } from '@utils/appError';
import {
    createEventForm,
    findActiveEventForm,
    findEventFormById,
    updateEventForm,
    deleteEventForm
} from './event-form.repository';
// Assuming we need to check if the event exists, we might need a basic event repository or cross-module call.
// For now, we will just use Prisma directly to verify the event exists.
import { prisma } from '@db/prisma';
import type { Prisma } from '@prisma/client';

export const createEventFormService = async (data: Prisma.EventFormUncheckedCreateInput) => {
    // Check if event exists
    const event = await prisma.event.findUnique({ where: { id: data.eventId } });
    if (!event) {
        throw new AppError('Event not found', 404);
    }

    // Check if a form for this target already exists for this event
    const existingForm = await findActiveEventForm(data.eventId, data.target);
    if (existingForm) {
        throw new AppError(`An active form for ${data.target} already exists for this event`, 409);
    }

    return createEventForm(data);
};

export const getEventFormService = async (id: string) => {
    const form = await findEventFormById(id);
    if (!form) {
        throw new AppError('Event Form not found', 404);
    }
    return form;
};

export const getActiveEventFormService = async (eventId: string, target: 'VISITOR' | 'EXHIBITOR') => {
    const form = await findActiveEventForm(eventId, target);
    if (!form) {
        throw new AppError(`No active ${target} form found for this event`, 404);
    }
    return form;
};

export const updateEventFormService = async (id: string, data: Prisma.EventFormUpdateInput) => {
    const form = await findEventFormById(id);
    if (!form) {
        throw new AppError('Event Form not found', 404);
    }

    return updateEventForm(id, data);
};

export const deleteEventFormService = async (id: string) => {
    const form = await findEventFormById(id);
    if (!form) {
        throw new AppError('Event Form not found', 404);
    }

    return deleteEventForm(id);
};
