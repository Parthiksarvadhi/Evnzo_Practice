import { Router } from 'express';
import { validateRequest } from '@middleware/validation';
import {
    addFormFieldController,
    deleteFormFieldController,
    listFormFieldsController,
    updateFormFieldController,
} from './form-field.controller';
import {
    addFormFieldSchema,
    getFormFieldsSchema,
    updateFormFieldSchema,
} from './form-field.validation';

export const formFieldRouter = Router();

// Public / User Routes
formFieldRouter.get(
    '/form/:formId',
    validateRequest({ params: getFormFieldsSchema.shape.params }),
    listFormFieldsController
);

// Organizer / Admin Routes 
formFieldRouter.post(
    '/',
    validateRequest({ body: addFormFieldSchema.shape.body }),
    addFormFieldController
);

formFieldRouter.put(
    '/:id',
    validateRequest({ params: updateFormFieldSchema.shape.params, body: updateFormFieldSchema.shape.body }),
    updateFormFieldController
);

formFieldRouter.delete(
    '/:id',
    deleteFormFieldController
);
