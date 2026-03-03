import { Router } from 'express';
import { validateRequest } from '@middleware/validation';
import {
  submitFormController,
  getSubmissionController,
  getFormSubmissionsListController,
} from './form-submission.controller';
import {
  submitFormSchema,
  getSubmissionSchema,
  getFormSubmissionsListSchema,
} from './form-submission.validation';

export const formSubmissionRouter = Router();

// Submit form
formSubmissionRouter.post('/', validateRequest(submitFormSchema), submitFormController);

// Get submission by ID
formSubmissionRouter.get('/:id', validateRequest(getSubmissionSchema), getSubmissionController);

// Get all submissions for a form
formSubmissionRouter.get(
  '/form/:formId',
  validateRequest(getFormSubmissionsListSchema),
  getFormSubmissionsListController
);
