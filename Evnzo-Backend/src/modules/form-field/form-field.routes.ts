import { Router } from 'express';
import { validateRequest } from '@middleware/validation';
import {
  addFormFieldController,
  listFormFieldsController,
  updateFormFieldController,
  deleteFormFieldController,
} from './form-field.controller';
import {
  addFormFieldSchema,
  getFormFieldsSchema,
  updateFormFieldSchema,
} from './form-field.validation';

export const formFieldRouter = Router();

// Add field to form
formFieldRouter.post('/', validateRequest(addFormFieldSchema), addFormFieldController);

// List all fields for a form
formFieldRouter.get('/:formId', validateRequest(getFormFieldsSchema), listFormFieldsController);

// Update field
formFieldRouter.put('/:id', validateRequest(updateFormFieldSchema), updateFormFieldController);

// Delete field
formFieldRouter.delete('/:id', deleteFormFieldController);
