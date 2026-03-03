import type { Request, Response } from 'express';
import { RES_STATUS, RES_TYPES } from '@constant/message.constant';
import { handleApiResponse } from '@utils/handleResponse';
import {
    createEventFormService,
    getActiveEventFormService,
    getEventFormService,
    updateEventFormService,
    deleteEventFormService
} from './event-form.service';

export const createEventFormController = async (req: Request, res: Response) => {
    const form = await createEventFormService(req.body);

    return handleApiResponse(res, {
        responseType: RES_STATUS.CREATE,
        message: 'Event form created successfully',
        data: form,
    });
};

export const getActiveEventFormController = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const target = req.query.target as 'VISITOR' | 'EXHIBITOR';

    const form = await getActiveEventFormService(eventId, target);

    return handleApiResponse(res, {
        responseType: RES_STATUS.GET,
        message: 'Active event form fetched successfully',
        data: form,
    });
};

export const getEventFormByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const form = await getEventFormService(id);

    return handleApiResponse(res, {
        responseType: RES_STATUS.GET,
        message: 'Event form fetched successfully',
        data: form,
    });
};

export const updateEventFormController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const form = await updateEventFormService(id, req.body);

    return handleApiResponse(res, {
        responseType: RES_STATUS.UPDATE,
        message: 'Event form updated successfully',
        data: form,
    });
};

export const deleteEventFormController = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteEventFormService(id);

    return handleApiResponse(res, {
        responseType: RES_STATUS.DELETE,
        message: 'Event form deleted successfully',
    });
};
