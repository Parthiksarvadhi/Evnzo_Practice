import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formsApi } from '@/services/forms/forms.api';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
    eventId: z.string().min(1, 'Event ID is required'),
    target: z.enum(['VISITOR', 'EXHIBITOR']),
    title: z.string().min(3, 'Title is too short'),
    description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateFormPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventId: '51a65564-4539-4de3-9c73-afd5fdc5b950', // Dummy seeded event ID
            target: 'VISITOR',
            title: '',
            description: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const newForm = await formsApi.createForm(data);
            toast.success(`Successfully created form '${data.title}'!`);
            // Navigate to the form builder page to add fields
            navigate(`/dashboard/forms/${newForm.id}/fields`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to create form');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Create New Event Form</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Define a new form template for visitors or exhibitors.
                </p>
            </div>

            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">Event ID</label>
                        <input
                            {...register('eventId')}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                        {errors.eventId && <p className="text-xs text-red-500 mt-1">{errors.eventId.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">Target Audience</label>
                        <select
                            {...register('target')}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="VISITOR">Visitor</option>
                            <option value="EXHIBITOR">Exhibitor</option>
                        </select>
                        {errors.target && <p className="text-xs text-red-500 mt-1">{errors.target.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">Form Title</label>
                        <input
                            {...register('title')}
                            placeholder="e.g. Exhibitor Registration 2026"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">Description (Optional)</label>
                        <textarea
                            {...register('description')}
                            placeholder="Brief details about this form..."
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />}
                            {isSubmitting ? 'Creating...' : 'Create Form'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
