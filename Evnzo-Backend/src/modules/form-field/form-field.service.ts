import {
  addFormField,
  deleteFormField,
  getFormFieldById,
  listFormFields,
  updateFormField,
} from './form-field.repository';
import { AppError } from '@utils/appError';
import { ERROR_TYPES } from '@constant/errorTypes.constant';

interface AddFormFieldData {
  formId: string;
  name: string;
  label: string;
  type: 'TEXT' | 'TEXTAREA' | 'EMAIL' | 'NUMBER' | 'DROPDOWN' | 'CHECKBOX' | 'RADIO' | 'FILE';
  isRequired?: boolean;
  options?: string[];
  order?: number;
}

interface UpdateFormFieldData {
  label?: string;
  isRequired?: boolean;
  options?: string[];
  order?: number;
}

export const addFormFieldService = async (data: AddFormFieldData) => {
  return await addFormField(data);
};

export const listFormFieldsService = async (formId: string) => {
  return await listFormFields(formId);
};

export const updateFormFieldService = async (id: string, data: UpdateFormFieldData) => {
  const field = await getFormFieldById(id);

  if (!field) {
    throw new AppError('Form field not found', 404, ERROR_TYPES.NOT_FOUND);
  }

  return await updateFormField(id, data);
};

export const deleteFormFieldService = async (id: string) => {
  const field = await getFormFieldById(id);

  if (!field) {
    throw new AppError('Form field not found', 404, ERROR_TYPES.NOT_FOUND);
  }

  await deleteFormField(id);
};
