import { apiService } from '@/services/configs/apiService';

export const eventsApi = {
    createEvent: (data: any) => apiService.post<any>('/event', data),
    getEvents: () => apiService.get<any>('/event'),
    getEvent: (id: string) => apiService.get<any>(`/event/${id}`),
};
