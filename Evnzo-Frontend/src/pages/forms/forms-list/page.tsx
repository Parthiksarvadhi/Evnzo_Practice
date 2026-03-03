import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

// Mock data for demonstration - replace with actual API calls
const mockForms = [
  {
    id: '1',
    title: 'Visitor Registration Form',
    target: 'VISITOR',
    eventId: 'event-123',
    isActive: true,
    fieldsCount: 8,
    submissionsCount: 45,
  },
  {
    id: '2',
    title: 'Exhibitor Application Form',
    target: 'EXHIBITOR',
    eventId: 'event-123',
    isActive: true,
    fieldsCount: 12,
    submissionsCount: 23,
  },
];

export function FormsListPage() {
  const navigate = useNavigate();
  const [forms] = useState(mockForms);

  const handleCreateForm = () => {
    // In real app, get eventId from context or route
    navigate('/dashboard/forms/builder?eventId=event-123');
  };

  const handleEditForm = (formId: string) => {
    navigate(`/dashboard/forms/builder?formId=${formId}`);
  };

  const handleViewSubmissions = (formId: string) => {
    navigate(`/dashboard/forms/${formId}/submissions`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage dynamic forms for your events
          </p>
        </div>
        <button
          onClick={handleCreateForm}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus className="h-4 w-4" />
          Create Form
        </button>
      </div>

      {forms.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No forms yet</h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first dynamic form
          </p>
          <button
            onClick={handleCreateForm}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Plus className="h-4 w-4" />
            Create Your First Form
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <div
              key={form.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{form.title}</h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      form.target === 'VISITOR'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {form.target}
                  </span>
                </div>
                <div
                  className={`h-2 w-2 rounded-full ${
                    form.isActive ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  title={form.isActive ? 'Active' : 'Inactive'}
                />
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Fields:</span>
                  <span className="font-medium text-gray-900">{form.fieldsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Submissions:</span>
                  <span className="font-medium text-gray-900">{form.submissionsCount}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEditForm(form.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleViewSubmissions(form.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
