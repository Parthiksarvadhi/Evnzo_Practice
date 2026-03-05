import { Router } from 'express';
import { validateRequest } from '@middleware/validation';
import { createEventSchema, getEventSchema } from './event.validation';
import { createEventController, getEventController, getEventsController } from './event.controller';

export const eventRouter = Router();

eventRouter.post(
    '/',
    validateRequest({ body: createEventSchema.shape.body }),
    (req, res, next) => { void createEventController(req, res).catch(next); }
);

eventRouter.get(
    '/',
    (req, res, next) => { void getEventsController(req, res).catch(next); }
);

eventRouter.get(
    '/:id',
    validateRequest({ params: getEventSchema.shape.params }),
    (req, res, next) => { void getEventController(req, res).catch(next); }
);
