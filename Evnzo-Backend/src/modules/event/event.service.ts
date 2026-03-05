import { AppError } from '@utils/appError';
import { ERROR_TYPES } from '@constant/errorTypes.constant';
import { createEvent, getEventById, getEvents } from './event.repository';

export const createEventService = async (data: any) => {
    return createEvent(data);
};

export const getEventsService = async () => {
    return getEvents();
};

export const getEventService = async (id: string) => {
    const event = await getEventById(id);
    if (!event) {
        throw new AppError({ message: 'Event not found', errorType: ERROR_TYPES.NOT_FOUND });
    }
    return event;
};
