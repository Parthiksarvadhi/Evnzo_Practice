import { z } from 'zod';

export const createEventSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        description: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
    }),
});

export const getEventSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid Event ID format'),
    }),
});
