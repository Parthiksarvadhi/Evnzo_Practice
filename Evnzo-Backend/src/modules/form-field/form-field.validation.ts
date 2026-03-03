import { z } from 'zod';
import { FieldType } from '@prisma/client';

export const addFormFieldSchema = z.object({
    body: z.object({
        formId: z.string().uuid({ message: 'Valid Form ID is required' }),
        name: z.string().min(1, { message: 'Field internal name is required' })
            .regex(/^[a-zA-Z0-9_]+$/, 'Name can only contain letters, numbers, and underscores'),
        label: z.string().min(1, { message: 'Display label is required' }),
        type: z.nativeEnum(FieldType, {
            errorMap: () => ({ message: 'Invalid Field Type' }),
        }),
        isRequired: z.boolean().optional(),
        options: z.array(z.string()).optional(),
        order: z.number().int().optional(),
    }).refine((data) => {
        // If type requires options (dropdown, radio, checkbox), options should ideally exist
        if (['DROPDOWN', 'RADIO', 'CHECKBOX'].includes(data.type) && (!data.options || data.options.length === 0)) {
            return false;
        }
        return true;
    }, {
        message: 'Options are required for DROPDOWN, RADIO, or CHECKBOX field types',
        path: ['options'],
    }),
});

export const getFormFieldsSchema = z.object({
    params: z.object({
        formId: z.string().uuid({ message: 'Valid Form ID is required' }),
    }),
});

export const updateFormFieldSchema = z.object({
    params: z.object({
        id: z.string().uuid({ message: 'Valid Field ID is required' }),
    }),
    body: z.object({
        label: z.string().optional(),
        isRequired: z.boolean().optional(),
        options: z.array(z.string()).optional(),
        order: z.number().int().optional(),
    }),
});
