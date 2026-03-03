import { Router } from 'express';
import { validateRequest } from '@middleware/validation';
// Assuming verifyToken and verifyRole middlewares exist in auth middleware
// import { verifyToken, verifyRole } from '@middleware/auth'; 
import {
    createEventFormController,
    deleteEventFormController,
    getActiveEventFormController,
    getEventFormByIdController,
    updateEventFormController,
} from './event-form.controller';
import {
    createEventFormSchema,
    getActiveEventFormSchema,
    updateEventFormSchema,
} from './event-form.validation';

export const eventFormRouter = Router();

// Public / User routes
eventFormRouter.get(
    '/active/:eventId',
    validateRequest({ params: getActiveEventFormSchema.shape.params, query: getActiveEventFormSchema.shape.query }),
    (req, res, next) => { void getActiveEventFormController(req, res).catch(next); }
);

eventFormRouter.get(
    '/:id',
    (req, res, next) => { void getEventFormByIdController(req, res).catch(next); }
);

// Organizer / Admin Routes (ideally protected by verifyToken and verifyRole(['ADMIN']))
eventFormRouter.post(
    '/',
    validateRequest({ body: createEventFormSchema.shape.body }),
    (req, res, next) => { void createEventFormController(req, res).catch(next); }
);

eventFormRouter.put(
    '/:id',
    validateRequest({ params: updateEventFormSchema.shape.params, body: updateEventFormSchema.shape.body }),
    (req, res, next) => { void updateEventFormController(req, res).catch(next); }
);

eventFormRouter.delete(
    '/:id',
    (req, res, next) => { void deleteEventFormController(req, res).catch(next); }
);
