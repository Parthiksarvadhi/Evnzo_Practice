import { AppError } from '@utils/appError';
import { ERROR_TYPES } from '@constant/errorTypes.constant';
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
        throw new AppError({ message: 'Event not found', errorType: ERROR_TYPES.NOT_FOUND });
    }

    // Check if a form for this target already exists for this event
    const existingForm = await findActiveEventForm(data.eventId, data.target);
    if (existingForm) {
        throw new AppError({ message: `An active form for ${data.target} already exists for this event`, errorType: ERROR_TYPES.CONFLICT });
    }

    return createEventForm(data);
};

export const getEventFormService = async (id: string) => {
    const form = await findEventFormById(id);
    if (!form) {
        throw new AppError({ message: 'Event Form not found', errorType: ERROR_TYPES.NOT_FOUND });
    }
    return form;
};

export const getActiveEventFormService = async (eventId: string, target: 'VISITOR' | 'EXHIBITOR') => {
    const form = await findActiveEventForm(eventId, target);
    if (!form) {
        throw new AppError({ message: `No active ${target} form found for this event`, errorType: ERROR_TYPES.NOT_FOUND });
    }
    return form;
};

export const updateEventFormService = async (id: string, data: Prisma.EventFormUpdateInput) => {
    const form = await findEventFormById(id);
    if (!form) {
        throw new AppError({ message: 'Event Form not found', errorType: ERROR_TYPES.NOT_FOUND });
    }

    return updateEventForm(id, data);
};

export const deleteEventFormService = async (id: string) => {
    const form = await findEventFormById(id);
    if (!form) {
        throw new AppError({ message: 'Event Form not found', errorType: ERROR_TYPES.NOT_FOUND });
    }

    return deleteEventForm(id);
};
