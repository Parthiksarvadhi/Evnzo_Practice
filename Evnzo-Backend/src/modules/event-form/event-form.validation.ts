import { z } from 'zod';
import { FieldType, FormTarget } from '@prisma/client';

export const createEventFormSchema = z.object({
    body: z.object({
        eventId: z.string().uuid({ message: 'Valid Event ID is required' }),
        target: z.nativeEnum(FormTarget, {
            errorMap: () => ({ message: 'Target must be VISITOR or EXHIBITOR' }),
        }),
        title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
    }),
});

export const getActiveEventFormSchema = z.object({
    params: z.object({
        eventId: z.string().uuid({ message: 'Valid Event ID is required' }),
    }),
    query: z.object({
        target: z.nativeEnum(FormTarget, {
            errorMap: () => ({ message: 'Target query must be VISITOR or EXHIBITOR' }),
        }),
    }),
});

export const updateEventFormSchema = z.object({
    params: z.object({
        id: z.string().uuid({ message: 'Valid Event Form ID is required' }),
    }),
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
    }),
});
