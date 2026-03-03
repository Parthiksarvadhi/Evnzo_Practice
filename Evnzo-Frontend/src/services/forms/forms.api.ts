import { apiService } from '@/services/configs/apiService';
import { API_ENDPOINTS } from '@/utils/constants/api.constant';
import type {
  EventForm,
  CreateEventFormPayload,
  UpdateEventFormPayload,
  FormField,
  AddFormFieldPayload,
  UpdateFormFieldPayload,
  FormSubmission,
  SubmitFormPayload,
} from '@/types/form';

export const formsApi = {
  // Event Forms
  createEventForm: (data: CreateEventFormPayload) =>
    apiService.post<EventForm>(API_ENDPOINTS.EVENT_FORMS, data),

  getActiveEventForm: (eventId: string, target: string) =>
    apiService.get<EventForm>(API_ENDPOINTS.ACTIVE_EVENT_FORM(eventId, target)),

  getEventFormById: (id: string) =>
    apiService.get<EventForm>(API_ENDPOINTS.EVENT_FORM_BY_ID(id)),

  updateEventForm: (id: string, data: UpdateEventFormPayload) =>
    apiService.put<EventForm>(API_ENDPOINTS.EVENT_FORM_BY_ID(id), data),

  deleteEventForm: (id: string) =>
    apiService.delete<void>(API_ENDPOINTS.EVENT_FORM_BY_ID(id)),

  // Form Fields
  addFormField: (data: AddFormFieldPayload) =>
    apiService.post<FormField>(API_ENDPOINTS.FORM_FIELDS, data),

  listFormFields: (formId: string) =>
    apiService.get<FormField[]>(API_ENDPOINTS.FORM_FIELDS_BY_FORM(formId)),

  updateFormField: (id: string, data: UpdateFormFieldPayload) =>
    apiService.put<FormField>(API_ENDPOINTS.FORM_FIELD_BY_ID(id), data),

  deleteFormField: (id: string) =>
    apiService.delete<void>(API_ENDPOINTS.FORM_FIELD_BY_ID(id)),

  // Form Submissions
  submitForm: (data: SubmitFormPayload) =>
    apiService.post<FormSubmission>(API_ENDPOINTS.FORM_SUBMISSIONS, data),

  getSubmission: (id: string) =>
    apiService.get<FormSubmission>(API_ENDPOINTS.FORM_SUBMISSION_BY_ID(id)),

  getFormSubmissions: (formId: string) =>
    apiService.get<FormSubmission[]>(API_ENDPOINTS.FORM_SUBMISSIONS_LIST(formId)),
};
