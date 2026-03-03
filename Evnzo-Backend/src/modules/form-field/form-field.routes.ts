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
    (req, res, next) => { void listFormFieldsController(req, res).catch(next); }
);

// Organizer / Admin Routes 
formFieldRouter.post(
    '/',
    validateRequest({ body: addFormFieldSchema.shape.body }),
    (req, res, next) => { void addFormFieldController(req, res).catch(next); }
);

formFieldRouter.put(
    '/:id',
    validateRequest({ params: updateFormFieldSchema.shape.params, body: updateFormFieldSchema.shape.body }),
    (req, res, next) => { void updateFormFieldController(req, res).catch(next); }
);

formFieldRouter.delete(
    '/:id',
    (req, res, next) => { void deleteFormFieldController(req, res).catch(next); }
);
