import {
  createFormSubmission,
  getFormSubmissionById,
  getFormSubmissionsList,
} from './form-submission.repository';
import { AppError } from '@utils/appError';
import { ERROR_TYPES } from '@constant/errorTypes.constant';

interface FormAnswer {
  fieldId: string;
  value: string | null;
}

export const submitFormService = async (
  formId: string,
  userId: number | undefined,
  answers: FormAnswer[]
) => {
  return await createFormSubmission(formId, userId, answers);
};

export const getSubmissionService = async (id: string) => {
  const submission = await getFormSubmissionById(id);

  if (!submission) {
    throw new AppError('Form submission not found', 404, ERROR_TYPES.NOT_FOUND);
  }

  return submission;
};

export const getFormSubmissionsListService = async (formId: string) => {
  return await getFormSubmissionsList(formId);
};
