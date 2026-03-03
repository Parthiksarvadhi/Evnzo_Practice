import { z } from 'zod';

export const submitFormSchema = z.object({
    body: z.object({
        formId: z.string().uuid({ message: 'Valid Form ID is required' }),
        userId: z.number().int().optional(),
        answers: z.array(
            z.object({
                fieldId: z.string().uuid({ message: 'Valid Field ID is required' }),
                value: z.string().optional().nullable(),
            })
        ).min(1, { message: 'At least one answer must be provided' }),
    }),
});

export const getSubmissionSchema = z.object({
    params: z.object({
        id: z.string().uuid({ message: 'Valid Submission ID is required' }),
    }),
});
