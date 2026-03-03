import { prisma } from '@db/prisma';

export const createFormSubmission = async (
    formId: string,
    userId: number | undefined,
    answers: { fieldId: string; value: string | null }[]
) => {
    return prisma.formSubmission.create({
        data: {
            formId,
            userId,
            answers: {
                create: answers.map((ans) => ({
                    fieldId: ans.fieldId,
                    value: ans.value,
                })),
            },
        },
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
                }
            }
        },
    });
};

export const findSubmissionById = async (id: string) => {
    return prisma.formSubmission.findUnique({
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
                }
            }
        },
    });
};

export const findSubmissionsByFormId = async (formId: string) => {
    return prisma.formSubmission.findMany({
        where: { formId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};
