import { useFormContext } from 'react-hook-form';
import type { FormField } from '@/types/form';
import { cn } from '@/lib/utils';

interface DynamicFieldProps {
  field: FormField;
  disabled?: boolean;
}

export function DynamicField({ field, disabled = false }: DynamicFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[field.name]?.message as string | undefined;
  const baseInputClass =
    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed';
  const errorClass = error ? 'border-red-500' : 'border-gray-300';

  const renderField = () => {
    switch (field.type) {
      case 'TEXT':
      case 'EMAIL':
      case 'NUMBER':
        return (
          <input
            type={field.type.toLowerCase()}
            {...register(field.name, {
              required: field.isRequired ? `${field.label} is required` : false,
              ...(field.type === 'EMAIL' && {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }),
            })}
            disabled={disabled}
            className={cn(baseInputClass, errorClass)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'TEXTAREA':
        return (
          <textarea
            {...register(field.name, {
              required: field.isRequired ? `${field.label} is required` : false,
            })}
            disabled={disabled}
            rows={4}
            className={cn(baseInputClass, errorClass, 'resize-none')}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'DROPDOWN':
        return (
          <select
            {...register(field.name, {
              required: field.isRequired ? `${field.label} is required` : false,
            })}
            disabled={disabled}
            className={cn(baseInputClass, errorClass)}
          >
            <option value="">Select an option</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'RADIO':
        return (
          <div className="space-y-2">
            {field.options.map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register(field.name, {
                    required: field.isRequired ? `${field.label} is required` : false,
                  })}
                  value={option}
                  disabled={disabled}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'CHECKBOX':
        return (
          <div className="space-y-2">
            {field.options.map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register(field.name, {
                    required: field.isRequired ? `${field.label} is required` : false,
                  })}
                  value={option}
                  disabled={disabled}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'FILE':
        return (
          <input
            type="file"
            {...register(field.name, {
              required: field.isRequired ? `${field.label} is required` : false,
            })}
            disabled={disabled}
            className={cn(
              'w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100',
              errorClass
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
