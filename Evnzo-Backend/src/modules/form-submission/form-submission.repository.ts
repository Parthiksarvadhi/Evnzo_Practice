import prisma from '@db/prisma';

interface FormAnswer {
  fieldId: string;
  value: string | null;
}

export const createFormSubmission = async (
  formId: string,
  userId: number | undefined,
  answers: FormAnswer[]
) => {
  return await prisma.formSubmission.create({
    data: {
      formId,
      userId,
      status: 'SUBMITTED',
      answers: {
        create: answers.map((answer) => ({
          fieldId: answer.fieldId,
          value: answer.value,
        })),
      },
    },
    include: {
      answers: {
        include: {
          field: true,
        },
      },
    },
  });
};

export const getFormSubmissionById = async (id: string) => {
  return await prisma.formSubmission.findUnique({
    where: { id },
    include: {
      answers: {
        include: {
          field: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getFormSubmissionsList = async (formId: string) => {
  return await prisma.formSubmission.findMany({
    where: { formId },
    include: {
      answers: {
        include: {
          field: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
