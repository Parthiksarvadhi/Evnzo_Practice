import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { CheckCircle } from 'lucide-react';
import { DynamicField } from '@/components/forms/DynamicField';
import { useGetActiveEventForm, useSubmitForm } from '@/services/forms/forms.query';
import type { FormAnswer } from '@/types/form';

export function FormRendererPage() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const target = searchParams.get('target') as 'VISITOR' | 'EXHIBITOR';

  const { data: form, isLoading, error } = useGetActiveEventForm(
    eventId || '',
    target || '',
    !!eventId && !!target
  );

  const { mutate: submitForm, isPending: isSubmitting, isSuccess } = useSubmitForm();

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (form?.fields) {
      const defaultValues: Record<string, string> = {};
      form.fields.forEach((field) => {
        defaultValues[field.name] = '';
      });
      reset(defaultValues);
    }
  }, [form, reset]);

  const onSubmit = (data: Record<string, any>) => {
    if (!form) return;

    const answers: FormAnswer[] = form.fields!.map((field) => ({
      fieldId: field.id,
      value: data[field.name] || null,
    }));

    submitForm({
      formId: form.id,
      answers,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Form Not Found</h2>
          <p className="text-gray-600">
            The form you're looking for doesn't exist or is no longer active.
          </p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white border border-green-200 rounded-lg p-8 text-center">
          <div className="text-green-500 mb-4">
            <CheckCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your form has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  const sortedFields = [...(form.fields || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Form Header */}
          <div className="border-b border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900">{form.title}</h1>
            {form.description && (
              <p className="mt-2 text-gray-600">{form.description}</p>
            )}
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
              {target === 'VISITOR' ? 'Visitor Form' : 'Exhibitor Form'}
            </div>
          </div>

          {/* Form Fields */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {sortedFields.map((field) => (
                <DynamicField key={field.id} field={field} disabled={isSubmitting} />
              ))}

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Form'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
}
