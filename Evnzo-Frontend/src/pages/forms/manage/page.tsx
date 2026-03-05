import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formsApi } from '@/services/forms/forms.api';

const fieldSchema = z.object({
    name: z.string().min(1, 'Name is required (internal identifier)'),
    label: z.string().min(1, 'Label is required'),
    type: z.enum(['TEXT', 'TEXTAREA', 'EMAIL', 'NUMBER', 'DROPDOWN', 'CHECKBOX', 'RADIO', 'FILE']),
    isRequired: z.boolean().default(false),
    options: z.string().optional(), // Comma-separated options for dropdowns
});

type FieldValues = z.infer<typeof fieldSchema>;

export function ManageFormFieldsPage() {
    const { id: formId } = useParams();
    const [formDetails, setFormDetails] = useState<any>(null);
    const [fields, setFields] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<FieldValues>({
        resolver: zodResolver(fieldSchema),
        defaultValues: {
            type: 'TEXT',
            isRequired: false,
        },
    });

    const selectedType = watch('type');
    const needsOptions = ['DROPDOWN', 'CHECKBOX', 'RADIO'].includes(selectedType);

    const fetchFields = async () => {
        try {
            if (!formId) return;
            const [formRes, fieldsRes] = await Promise.all([
                formsApi.getForm(formId),
                formsApi.getFields(formId),
            ]);
            setFormDetails(formRes);
            setFields(fieldsRes);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to fetch fields');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFields();
    }, [formId]);

    const onAddField = async (data: FieldValues) => {
        try {
            const payload: any = {
                formId,
                ...data,
            };

            if (needsOptions && data.options) {
                payload.options = data.options.split(',').map((o) => o.trim()).filter(Boolean);
            } else {
                payload.options = [];
            }

            await formsApi.createField(payload);
            toast.success('Field added successfully');
            reset();
            fetchFields();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add field');
        }
    };

    if (isLoading) {
        return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;
    }

    if (!formDetails) {
        return <div className="text-center p-8 text-red-500">Form not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Manage Fields</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Form: {formDetails.title} ({formDetails.target})
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Add New Field Form */}
                <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">Add New Field</h2>
                    <form onSubmit={handleSubmit(onAddField)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground">Field Label (Display Name)</label>
                            <input
                                {...register('label')}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="e.g. Your Company Name"
                            />
                            {errors.label && <p className="text-xs text-red-500 mt-1">{errors.label.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground">Internal Name</label>
                            <input
                                {...register('name')}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="e.g. company_name"
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground">Field Type</label>
                            <select
                                {...register('type')}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            >
                                <option value="TEXT">Text</option>
                                <option value="EMAIL">Email</option>
                                <option value="NUMBER">Number</option>
                                <option value="TEXTAREA">Text Area</option>
                                <option value="DROPDOWN">Dropdown / Select</option>
                                <option value="CHECKBOX">Checkboxes</option>
                                <option value="RADIO">Radio Buttons</option>
                            </select>
                        </div>

                        {needsOptions && (
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-foreground">Options (Comma separated)</label>
                                <input
                                    {...register('options')}
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="e.g. Apple, Banana, Orange"
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="isRequired" {...register('isRequired')} className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <label htmlFor="isRequired" className="text-sm font-medium text-foreground">This field is required</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full pt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                            {isSubmitting ? 'Adding...' : 'Add Field'}
                        </button>
                    </form>
                </div>

                {/* List Current Fields */}
                <div className="bg-gray-50 rounded-xl border border-border p-6">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">Current Fields</h2>
                    {fields.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-gray-200 rounded-lg">
                            No fields added yet.
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {fields.map((f: any, i) => (
                                <li key={f.id} className="bg-white p-3 rounded-lg border border-border shadow-sm flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-sm flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
                                                {i + 1}
                                            </span>
                                            {f.label}
                                            {f.isRequired && <span className="text-red-500 text-xs font-bold">*</span>}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1 flex gap-2">
                                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">{f.type}</span>
                                            <span>Name: {f.name}</span>
                                        </div>
                                    </div>
                                    <button className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {fields.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-border">
                            <Link to={`/form/${formId}`} target="_blank" className="w-full block text-center px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
                                Preview Public Form 🚀
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
