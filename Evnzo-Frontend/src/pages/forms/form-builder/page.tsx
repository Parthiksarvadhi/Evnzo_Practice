import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { FieldBuilder, type FieldData } from '@/components/forms/FieldBuilder';
import { FieldList } from '@/components/forms/FieldList';
import {
  useCreateEventForm,
  useAddFormField,
  useListFormFields,
  useDeleteFormField,
  useGetEventFormById,
} from '@/services/forms/forms.query';
import type { FormTarget } from '@/types/form';

export function FormBuilderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const formId = searchParams.get('formId');

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formTarget, setFormTarget] = useState<FormTarget>('VISITOR');
  const [currentFormId, setCurrentFormId] = useState<string | null>(formId);

  const { mutate: createForm, isPending: isCreatingForm } = useCreateEventForm();
  const { mutate: addField, isPending: isAddingField } = useAddFormField();
  const { mutate: deleteField, isPending: isDeletingField } = useDeleteFormField();

  const { data: existingForm, isLoading: isLoadingForm } = useGetEventFormById(
    currentFormId || '',
    !!currentFormId
  );

  const { data: fields = [], isLoading: isLoadingFields } = useListFormFields(
    currentFormId || '',
    !!currentFormId
  );

  useEffect(() => {
    if (existingForm) {
      setFormTitle(existingForm.title);
      setFormDescription(existingForm.description || '');
      setFormTarget(existingForm.target);
    }
  }, [existingForm]);

  const handleCreateForm = () => {
    if (!eventId || !formTitle.trim()) return;

    createForm(
      {
        eventId,
        target: formTarget,
        title: formTitle,
        description: formDescription || undefined,
        isActive: true,
      },
      {
        onSuccess: (data) => {
          setCurrentFormId(data.id);
        },
      }
    );
  };

  const handleAddField = (fieldData: FieldData) => {
    if (!currentFormId) return;

    addField({
      formId: currentFormId,
      name: fieldData.name,
      label: fieldData.label,
      type: fieldData.type,
      isRequired: fieldData.isRequired,
      options: fieldData.options.length > 0 ? fieldData.options : undefined,
      order: fields.length,
    });
  };

  const handleDeleteField = (fieldId: string) => {
    if (!currentFormId) return;
    deleteField({ id: fieldId, formId: currentFormId });
  };

  const isLoading = isLoadingForm || isLoadingFields;
  const isSaving = isCreatingForm || isAddingField || isDeletingField;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {currentFormId ? 'Edit Form' : 'Create New Form'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Build a dynamic form for your event attendees
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Form Basic Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Form Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                disabled={!!currentFormId}
                placeholder="e.g., Visitor Registration Form"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                disabled={!!currentFormId}
                rows={3}
                placeholder="Brief description of this form"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience <span className="text-red-500">*</span>
              </label>
              <select
                value={formTarget}
                onChange={(e) => setFormTarget(e.target.value as FormTarget)}
                disabled={!!currentFormId}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              >
                <option value="VISITOR">Visitor</option>
                <option value="EXHIBITOR">Exhibitor</option>
              </select>
            </div>

            {!currentFormId && (
              <button
                onClick={handleCreateForm}
                disabled={!formTitle.trim() || !eventId || isCreatingForm}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isCreatingForm ? 'Creating...' : 'Create Form'}
              </button>
            )}
          </div>

          {/* Field Builder */}
          {currentFormId && (
            <>
              <FieldBuilder onAddField={handleAddField} disabled={isSaving} />

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Fields</h2>
                <FieldList
                  fields={fields}
                  onDelete={handleDeleteField}
                  disabled={isSaving}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => navigate('/dashboard/forms')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
