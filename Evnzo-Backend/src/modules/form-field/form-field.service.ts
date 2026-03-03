import { AppError } from '@utils/appError';
import { ERROR_TYPES } from '@constant/errorTypes.constant';
import {
    createFormField,
    deleteFormField,
    findFormFieldsByFormId,
    updateFormField,
} from './form-field.repository';
import { prisma } from '@db/prisma';
import type { Prisma } from '@prisma/client';

export const addFormFieldService = async (data: Prisma.FormFieldUncheckedCreateInput) => {
    // Check if form exists
    const form = await prisma.eventForm.findUnique({ where: { id: data.formId } });
    if (!form) {
        throw new AppError({ message: 'Event Form not found', errorType: ERROR_TYPES.NOT_FOUND });
    }

    // Check if field name is already taken in this form
    const existingField = await prisma.formField.findUnique({
        where: {
            formId_name: {
                formId: data.formId,
                name: data.name,
            },
        },
    });

    if (existingField) {
        throw new AppError({ message: `Field with name '${data.name}' already exists in this form`, errorType: ERROR_TYPES.CONFLICT });
    }

    return createFormField(data);
};

export const listFormFieldsService = async (formId: string) => {
    // We can just fetch them directly. If form doesn't exist, it returns an empty array.
    return findFormFieldsByFormId(formId);
};

export const updateFormFieldService = async (id: string, data: Prisma.FormFieldUpdateInput) => {
    const field = await prisma.formField.findUnique({ where: { id } });
    if (!field) {
        throw new AppError({ message: 'Form field not found', errorType: ERROR_TYPES.NOT_FOUND });
    }

    return updateFormField(id, data);
};

export const deleteFormFieldService = async (id: string) => {
    const field = await prisma.formField.findUnique({ where: { id } });
    if (!field) {
        throw new AppError({ message: 'Form field not found', errorType: ERROR_TYPES.NOT_FOUND });
    }

    return deleteFormField(id);
};
