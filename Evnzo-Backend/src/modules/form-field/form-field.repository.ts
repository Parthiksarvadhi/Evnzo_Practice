import prisma from '@db/prisma';

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

export const addFormField = async (data: AddFormFieldData) => {
  return await prisma.formField.create({
    data: {
      formId: data.formId,
      name: data.name,
      label: data.label,
      type: data.type,
      isRequired: data.isRequired ?? false,
      options: JSON.stringify(data.options ?? []),
      order: data.order ?? 0,
    },
  });
};

export const listFormFields = async (formId: string) => {
  const fields = await prisma.formField.findMany({
    where: { formId },
    orderBy: {
      order: 'asc',
    },
  });
  
  // Parse options JSON string to array
  return fields.map(field => ({
    ...field,
    options: JSON.parse(field.options),
  }));
};

export const getFormFieldById = async (id: string) => {
  return await prisma.formField.findUnique({
    where: { id },
  });
};

export const updateFormField = async (id: string, data: UpdateFormFieldData) => {
  const updateData: any = { ...data };
  if (data.options) {
    updateData.options = JSON.stringify(data.options);
  }
  
  return await prisma.formField.update({
    where: { id },
    data: updateData,
  });
};

export const deleteFormField = async (id: string) => {
  await prisma.formField.delete({
    where: { id },
  });
};
