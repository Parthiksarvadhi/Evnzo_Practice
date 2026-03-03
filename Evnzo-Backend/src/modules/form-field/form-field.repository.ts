import { prisma } from '@db/prisma';
import type { Prisma } from '@prisma/client';

export const createFormField = async (data: Prisma.FormFieldUncheckedCreateInput) => {
    return prisma.formField.create({
        data,
    });
};

export const findFormFieldsByFormId = async (formId: string) => {
    return prisma.formField.findMany({
        where: { formId },
        orderBy: { order: 'asc' },
    });
};

export const updateFormField = async (id: string, data: Prisma.FormFieldUpdateInput) => {
    return prisma.formField.update({
        where: { id },
        data,
    });
};

export const deleteFormField = async (id: string) => {
    return prisma.formField.delete({
        where: { id },
    });
};
