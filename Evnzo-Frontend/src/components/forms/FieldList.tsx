import { GripVertical, Trash2, Edit2 } from 'lucide-react';
import type { FormField } from '@/types/form';

interface FieldListProps {
  fields: FormField[];
  onDelete: (fieldId: string) => void;
  onReorder?: (fields: FormField[]) => void;
  disabled?: boolean;
}

export function FieldList({ fields, onDelete, disabled = false }: FieldListProps) {
  if (fields.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No fields added yet. Add your first field above.
      </div>
    );
  }

  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-3">
      {sortedFields.map((field) => (
        <div
          key={field.id}
          className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <div className="cursor-move text-gray-400">
            <GripVertical className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-gray-900">{field.label}</h4>
              {field.isRequired && (
                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">
                  Required
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span>Type: {field.type}</span>
              <span>•</span>
              <span>Name: {field.name}</span>
              {field.options.length > 0 && (
                <>
                  <span>•</span>
                  <span>Options: {field.options.length}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => onDelete(field.id)}
            disabled={disabled}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Delete field"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
