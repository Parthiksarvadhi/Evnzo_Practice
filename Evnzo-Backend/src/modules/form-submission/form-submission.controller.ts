import type { Request, Response } from 'express';
import { RES_STATUS } from '@constant/message.constant';
import { handleApiResponse } from '@utils/handleResponse';
import {
  getFormSubmissionsListService,
  getSubmissionService,
  submitFormService,
} from './form-submission.service';

export const submitFormController = async (req: Request, res: Response) => {
  const { formId, userId, answers } = req.body;
  const submission = await submitFormService(formId, userId, answers);

  return handleApiResponse(res, {
    responseType: RES_STATUS.CREATE,
    message: 'Form submitted successfully',
    data: submission,
  });
};

export const getSubmissionController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const submission = await getSubmissionService(id);

  return handleApiResponse(res, {
    responseType: RES_STATUS.GET,
    message: 'Form submission fetched successfully',
    data: submission,
  });
};

export const getFormSubmissionsListController = async (req: Request, res: Response) => {
  const { formId } = req.params;
  const submissions = await getFormSubmissionsListService(formId);

  return handleApiResponse(res, {
    responseType: RES_STATUS.GET,
    message: 'Form submissions fetched successfully',
    data: submissions,
  });
};
