import { AppError } from '@utils/appError';
import { prisma } from '@db/prisma';
import {
    createFormSubmission,
    findSubmissionById,
    findSubmissionsByFormId,
} from './form-submission.repository';

export const submitFormService = async (
    formId: string,
    userId: number | undefined,
    answers: { fieldId: string; value: string | null }[]
) => {
    // 1. Fetch form and all its active fields
    const form = await prisma.eventForm.findUnique({
        where: { id: formId, isActive: true },
        include: { fields: true },
    });

    if (!form) {
        throw new AppError('Active Event Form not found', 404);
    }

    // 2. Validate answers against form fields
    const fieldMap = new Map(form.fields.map(f => [f.id, f]));
    const answerMap = new Map(answers.map(a => [a.fieldId, a]));

    for (const field of form.fields) {
        const answer = answerMap.get(field.id);

        // Check if required field is missing or empty
        if (field.isRequired && (!answer || answer.value === null || answer.value.trim() === '')) {
            throw new AppError(`Field '${field.label}' is required`, 400);
        }

        // Check if dropdown/radio answer is within valid options
        if (answer && answer.value && ['DROPDOWN', 'RADIO', 'CHECKBOX'].includes(field.type)) {
            if (field.options && field.options.length > 0) {
                // Simple check for string equality. For checkbox, value might be comma-separated,
                // but for simplicity we assume single choice or strict JSON array string matching.
                // A more advanced check could parse JSON arrays if CHECKBOX stores multiple answers.
                if (field.type !== 'CHECKBOX' && !field.options.includes(answer.value)) {
                    throw new AppError(`Invalid option '${answer.value}' for field '${field.label}'`, 400);
                }
            }
        }
    }

    // 3. Ensure no invalid fieldIds were submitted
    for (const ans of answers) {
        if (!fieldMap.has(ans.fieldId)) {
            throw new AppError(`Field ID '${ans.fieldId}' does not belong to this form`, 400);
        }
    }

    // 4. Save Submission
    return createFormSubmission(formId, userId, answers);
};

export const getSubmissionService = async (id: string) => {
    const submission = await findSubmissionById(id);
    if (!submission) {
        throw new AppError('Submission not found', 404);
    }
    return submission;
};

export const getFormSubmissionsListService = async (formId: string) => {
    // Verify form exists
    const form = await prisma.eventForm.findUnique({ where: { id: formId } });
    if (!form) {
        throw new AppError('Form not found', 404);
    }

    return findSubmissionsByFormId(formId);
};
