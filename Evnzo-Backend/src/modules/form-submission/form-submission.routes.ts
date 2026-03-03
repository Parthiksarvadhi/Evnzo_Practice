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
    submitFormController
);

// Organizer / Admin Routes
formSubmissionRouter.get(
    '/:id',
    validateRequest({ params: getSubmissionSchema.shape.params }),
    getSubmissionController
);

formSubmissionRouter.get(
    '/form/:formId',
    getFormSubmissionsListController
);
