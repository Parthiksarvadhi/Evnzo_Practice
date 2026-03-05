import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formsApi } from './forms.api';
import { toast } from '@/components/ui/toast';
import { getApiErrorMessage } from '@/utils/common-functions';
import type {
  CreateEventFormPayload,
  UpdateEventFormPayload,
  AddFormFieldPayload,
  UpdateFormFieldPayload,
  SubmitFormPayload,
} from '@/types/form';

// Query Keys
export const formQueryKeys = {
  all: ['forms'] as const,
  activeForm: (eventId: string, target: string) =>
    [...formQueryKeys.all, 'active', eventId, target] as const,
  formById: (id: string) => [...formQueryKeys.all, 'detail', id] as const,
  formFields: (formId: string) => [...formQueryKeys.all, 'fields', formId] as const,
  submissions: (formId: string) => [...formQueryKeys.all, 'submissions', formId] as const,
};

// Event Form Hooks
export function useCreateEventForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventFormPayload) => formsApi.createEventForm(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.all });
      toast.success('Form created successfully');
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, 'Failed to create form'));
    },
  });
}

export function useGetActiveEventForm(eventId: string, target: string, enabled = true) {
  return useQuery({
    queryKey: formQueryKeys.activeForm(eventId, target),
    queryFn: () => formsApi.getActiveEventForm(eventId, target),
    enabled: enabled && !!eventId && !!target,
  });
}

export function useGetEventFormById(id: string, enabled = true) {
  return useQuery({
    queryKey: formQueryKeys.formById(id),
    queryFn: () => formsApi.getEventFormById(id),
    enabled: enabled && !!id,
  });
}

export function useUpdateEventForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventFormPayload }) =>
      formsApi.updateEventForm(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.formById(variables.id) });
      queryClient.invalidateQueries({ queryKey: formQueryKeys.all });
      toast.success('Form updated successfully');
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, 'Failed to update form'));
    },
  });
}

export function useDeleteEventForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => formsApi.deleteEventForm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.all });
      toast.success('Form deleted successfully');
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, 'Failed to delete form'));
    },
  });
}

// Form Field Hooks
export function useAddFormField() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddFormFieldPayload) => formsApi.addFormField(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.formFields(variables.formId) });
      queryClient.invalidateQueries({ queryKey: formQueryKeys.formById(variables.formId) });
      toast.success('Field added successfully');
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, 'Failed to add field'));
    },
  });
}

export function useListFormFields(formId: string, enabled = true) {
  return useQuery({
    queryKey: formQueryKeys.formFields(formId),
    queryFn: () => formsApi.listFormFields(formId),
    enabled: enabled && !!formId,
  });
}

export function useUpdateFormField() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formId, data }: { id: string; formId: string; data: UpdateFormFieldPayload }) =>
      formsApi.updateFormField(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.formFields(variables.formId) });
      queryClient.invalidateQueries({ queryKey: formQueryKeys.formById(variables.formId) });
      toast.success('Field updated successfully');
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, 'Failed to update field'));
    },
  });
}

export function useDeleteFormField() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formId }: { id: string; formId: string }) =>
      formsApi.deleteFormField(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.formFields(variables.formId) });
      queryClient.invalidateQueries({ queryKey: formQueryKeys.formById(variables.formId) });
      toast.success('Field deleted successfully');
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, 'Failed to delete field'));
    },
  });
}

// Form Submission Hooks
export function useSubmitForm() {
  return useMutation({
    mutationFn: (data: SubmitFormPayload) => formsApi.submitForm(data),
    onSuccess: () => {
      toast.success('Form submitted successfully');
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, 'Failed to submit form'));
    },
  });
}

export function useGetFormSubmissions(formId: string, enabled = true) {
  return useQuery({
    queryKey: formQueryKeys.submissions(formId),
    queryFn: () => formsApi.getFormSubmissions(formId),
    enabled: enabled && !!formId,
  });
}
