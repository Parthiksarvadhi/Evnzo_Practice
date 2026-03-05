import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formsApi } from '@/services/forms/forms.api';

export function PublicFormPage() {
    const { id: formId } = useParams();
    const [formDetails, setFormDetails] = useState<any>(null);
    const [fields, setFields] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onTouched' });

    const fetchFormAndFields = async () => {
        try {
            if (!formId) return;
            const [formRes, fieldsRes] = await Promise.all([
                formsApi.getForm(formId),
                formsApi.getFields(formId),
            ]);
            setFormDetails(formRes);
            setFields(fieldsRes);
        } catch (err: any) {
            toast.error('This form does not exist or has been removed.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFormAndFields();
    }, [formId]);

    const onSubmit = async (data: any) => {
        try {
            // Data is in key-value pairs (fieldName: value)
            // The API expects: { formId, answers: [{ fieldId, value }] }
            const answers = Object.entries(data).map(([fieldName, value]) => {
                const field = fields.find((f) => f.name === fieldName);
                return {
                    fieldId: field.id,
                    // Convert array of values (like from checkboxes) into a string/JSON
                    value: Array.isArray(value) ? JSON.stringify(value) : String(value),
                };
            });

            await formsApi.submitForm({ formId, answers });
            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to submit form');
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    if (!formDetails || fields.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white border border-border rounded-xl shadow-sm max-w-sm w-full mx-4">
                    <p className="font-semibold text-lg text-foreground mb-2">Form Unavailable</p>
                    <p className="text-sm text-muted-foreground">This form has not been setup with any fields yet or no longer exists.</p>
                </div>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 px-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-10 text-center border border-border">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-3">Thank You!</h1>
                    <p className="text-muted-foreground text-lg mb-8">
                        Your form submission has been successfully recorded. We appreciate your response.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-primary font-medium hover:underline text-sm"
                    >
                        Submit another response
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-t-2xl shadow-sm border border-b-0 border-border p-8 border-t-8 border-t-primary">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{formDetails.title}</h1>
                    {formDetails.description && (
                        <p className="text-muted-foreground whitespace-pre-wrap">{formDetails.description}</p>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    {fields.sort((a, b) => a.order - b.order).map((field) => (
                        <div key={field.id} className="bg-white rounded-xl shadow-sm border border-border p-6 transition-all hover:border-primary/30">
                            <label className="block text-base font-semibold text-foreground mb-3">
                                {field.label} {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                            </label>

                            {field.type === 'TEXT' && (
                                <input
                                    type="text"
                                    {...register(field.name, { required: field.isRequired ? 'This field is required' : false })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-gray-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    placeholder="Your answer"
                                />
                            )}

                            {field.type === 'EMAIL' && (
                                <input
                                    type="email"
                                    {...register(field.name, { required: field.isRequired ? 'This field is required' : false })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-gray-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    placeholder="test@example.com"
                                />
                            )}

                            {field.type === 'NUMBER' && (
                                <input
                                    type="number"
                                    {...register(field.name, { required: field.isRequired ? 'This field is required' : false })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-gray-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                />
                            )}

                            {field.type === 'TEXTAREA' && (
                                <textarea
                                    rows={4}
                                    {...register(field.name, { required: field.isRequired ? 'This field is required' : false })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-gray-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                                    placeholder="Your answer"
                                />
                            )}

                            {field.type === 'DROPDOWN' && (
                                <select
                                    {...register(field.name, { required: field.isRequired ? 'This is required' : false })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-gray-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                >
                                    <option value="">Select an option</option>
                                    {field.options?.map((opt: string) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            )}

                            {field.type === 'RADIO' && (
                                <div className="space-y-3">
                                    {field.options?.map((opt: string) => (
                                        <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-gray-50 transition-colors cursor-pointer">
                                            <input
                                                type="radio"
                                                value={opt}
                                                {...register(field.name, { required: field.isRequired ? 'This is required' : false })}
                                                className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                            />
                                            <span className="text-sm text-foreground select-none">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {field.type === 'CHECKBOX' && (
                                <div className="space-y-3">
                                    {field.options?.map((opt: string) => (
                                        <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-gray-50 transition-colors cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value={opt}
                                                {...register(field.name, { required: field.isRequired ? 'This is required' : false })}
                                                className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                                            />
                                            <span className="text-sm text-foreground select-none">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {errors[field.name]?.message && (
                                <div className="mt-3 text-sm text-red-500 bg-red-50 py-2 px-3 rounded flex items-center gap-2 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                    {errors[field.name]?.message as string}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white text-base font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                            {isSubmitting ? 'Submitting...' : 'Submit Form'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
