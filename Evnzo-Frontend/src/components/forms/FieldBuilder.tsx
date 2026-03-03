import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { FieldType } from '@/types/form';

interface FieldBuilderProps {
  onAddField: (field: FieldData) => void;
  disabled?: boolean;
}

export interface FieldData {
  name: string;
  label: string;
  type: FieldType;
  isRequired: boolean;
  options: string[];
}

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'TEXT', label: 'Text' },
  { value: 'TEXTAREA', label: 'Text Area' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'NUMBER', label: 'Number' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'CHECKBOX', label: 'Checkbox' },
  { value: 'RADIO', label: 'Radio' },
  { value: 'FILE', label: 'File Upload' },
];

const OPTION_BASED_TYPES: FieldType[] = ['DROPDOWN', 'CHECKBOX', 'RADIO'];

export function FieldBuilder({ onAddField, disabled = false }: FieldBuilderProps) {
  const [fieldData, setFieldData] = useState<FieldData>({
    name: '',
    label: '',
    type: 'TEXT',
    isRequired: false,
    options: [],
  });
  const [optionInput, setOptionInput] = useState('');

  const needsOptions = OPTION_BASED_TYPES.includes(fieldData.type);

  const handleAddOption = () => {
    if (optionInput.trim()) {
      setFieldData((prev) => ({
        ...prev,
        options: [...prev.options, optionInput.trim()],
      }));
      setOptionInput('');
    }
  };

  const handleRemoveOption = (index: number) => {
    setFieldData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fieldData.name.trim() || !fieldData.label.trim()) {
      return;
    }

    if (needsOptions && fieldData.options.length === 0) {
      return;
    }

    onAddField(fieldData);

    // Reset form
    setFieldData({
      name: '',
      label: '',
      type: 'TEXT',
      isRequired: false,
      options: [],
    });
    setOptionInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-sm font-semibold text-gray-900">Add New Field</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Name (Internal)
          </label>
          <input
            type="text"
            value={fieldData.name}
            onChange={(e) =>
              setFieldData((prev) => ({
                ...prev,
                name: e.target.value.toLowerCase().replace(/\s+/g, '_'),
              }))
            }
            disabled={disabled}
            placeholder="e.g., company_name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Label</label>
          <input
            type="text"
            value={fieldData.label}
            onChange={(e) => setFieldData((prev) => ({ ...prev, label: e.target.value }))}
            disabled={disabled}
            placeholder="e.g., Company Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
          <select
            value={fieldData.type}
            onChange={(e) =>
              setFieldData((prev) => ({
                ...prev,
                type: e.target.value as FieldType,
                options: [],
              }))
            }
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {FIELD_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={fieldData.isRequired}
              onChange={(e) =>
                setFieldData((prev) => ({ ...prev, isRequired: e.target.checked }))
              }
              disabled={disabled}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Required Field</span>
          </label>
        </div>
      </div>

      {needsOptions && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddOption();
                }
              }}
              disabled={disabled}
              placeholder="Enter option and press Enter"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddOption}
              disabled={disabled}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {fieldData.options.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {fieldData.options.map((option, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm"
                >
                  {option}
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    disabled={disabled}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
      >
        Add Field
      </button>
    </form>
  );
}
