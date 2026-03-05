import { apiService } from '@/services/configs/apiService';

export const formsApi = {
    createForm: (data: any) => apiService.post<any>('/event-form', data),
    getForm: (id: string) => apiService.get<any>(`/event-form/${id}`),
    createField: (data: any) => apiService.post<any>('/form-field', data),
    getFields: (formId: string) => apiService.get<any>(`/form-field/form/${formId}`),
    submitForm: (data: any) => apiService.post<any>('/form-submission', data),
};
