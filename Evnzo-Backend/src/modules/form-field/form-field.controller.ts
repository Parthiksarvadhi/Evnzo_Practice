import type { Request, Response } from 'express';
import { RES_STATUS } from '@constant/message.constant';
import { handleApiResponse } from '@utils/handleResponse';
import {
  addFormFieldService,
  deleteFormFieldService,
  listFormFieldsService,
  updateFormFieldService,
} from './form-field.service';

export const addFormFieldController = async (req: Request, res: Response) => {
  const field = await addFormFieldService(req.body);

  return handleApiResponse(res, {
    responseType: RES_STATUS.CREATE,
    message: 'Form field created successfully',
    data: field,
  });
};

export const listFormFieldsController = async (req: Request, res: Response) => {
  const { formId } = req.params;
  const fields = await listFormFieldsService(formId);

  return handleApiResponse(res, {
    responseType: RES_STATUS.GET,
    message: 'Form fields fetched successfully',
    data: fields,
  });
};

export const updateFormFieldController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const field = await updateFormFieldService(id, req.body);

  return handleApiResponse(res, {
    responseType: RES_STATUS.UPDATE,
    message: 'Form field updated successfully',
    data: field,
  });
};

export const deleteFormFieldController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteFormFieldService(id);

  return handleApiResponse(res, {
    responseType: RES_STATUS.DELETE,
    message: 'Form field deleted successfully',
  });
};
