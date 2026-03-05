import type { Request, Response } from 'express';
import { handleApiResponse } from '@utils/handleResponse';
import { RES_STATUS } from '@constant/message.constant';
import { createEventService, getEventService, getEventsService } from './event.service';

export const createEventController = async (req: Request, res: Response) => {
    const event = await createEventService(req.body);
    return handleApiResponse(res, {
        responseType: RES_STATUS.CREATE,
        message: 'Event created successfully',
        data: event,
    });
};

export const getEventsController = async (_req: Request, res: Response) => {
    const events = await getEventsService();
    return handleApiResponse(res, {
        responseType: RES_STATUS.GET,
        message: 'Events fetched successfully',
        data: events,
    });
};

export const getEventController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const event = await getEventService(id);
    return handleApiResponse(res, {
        responseType: RES_STATUS.GET,
        message: 'Event fetched successfully',
        data: event,
    });
};
