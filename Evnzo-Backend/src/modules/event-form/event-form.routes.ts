import { Router } from 'express';
import { validateRequest } from '@middleware/validation';
import {
  createEventFormController,
  getActiveEventFormController,
  getEventFormByIdController,
  updateEventFormController,
  deleteEventFormController,
} from './event-form.controller';
import {
  createEventFormSchema,
  getActiveEventFormSchema,
  updateEventFormSchema,
} from './event-form.validation';

export const eventFormRouter = Router();

// Create event form
eventFormRouter.post('/', validateRequest(createEventFormSchema), createEventFormController);

// Get active form for event
eventFormRouter.get(
  '/:eventId/active',
  validateRequest(getActiveEventFormSchema),
  getActiveEventFormController
);

// Get form by ID
eventFormRouter.get('/:id', getEventFormByIdController);

// Update form
eventFormRouter.put('/:id', validateRequest(updateEventFormSchema), updateEventFormController);

// Delete form
eventFormRouter.delete('/:id', deleteEventFormController);
