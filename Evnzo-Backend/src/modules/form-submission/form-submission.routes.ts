import { Router } from 'express';
import { validateRequest } from '@middleware/validation';
import {
    getFormSubmissionsListController,
    getSubmissionController,
    submitFormController,
} from './form-submission.controller';
import {
    getSubmissionSchema,
    submitFormSchema,
} from './form-submission.validation';

export const formSubmissionRouter = Router();

// Public / User Routes
formSubmissionRouter.post(
    '/',
    validateRequest({ body: submitFormSchema.shape.body }),
    (req, res, next) => { void submitFormController(req, res).catch(next); }
);

// Organizer / Admin Routes
formSubmissionRouter.get(
    '/:id',
    validateRequest({ params: getSubmissionSchema.shape.params }),
    (req, res, next) => { void getSubmissionController(req, res).catch(next); }
);

formSubmissionRouter.get(
    '/form/:formId',
    (req, res, next) => { void getFormSubmissionsListController(req, res).catch(next); }
);
