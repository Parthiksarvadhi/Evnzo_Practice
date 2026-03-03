import {
  createEventForm,
  getActiveEventForm,
  getEventFormById,
  updateEventForm,
  deleteEventForm,
} from './event-form.repository';
import { AppError } from '@utils/appError';
import { ERROR_TYPES } from '@constant/errorTypes.constant';

interface CreateEventFormData {
  eventId: string;
  target: 'VISITOR' | 'EXHIBITOR';
  title: string;
  description?: string;
  isActive?: boolean;
}

interface UpdateEventFormData {
  title?: string;
  description?: string;
  isActive?: boolean;
}

export const createEventFormService = async (data: CreateEventFormData) => {
  return await createEventForm(data);
};

export const getActiveEventFormService = async (eventId: string, target: 'VISITOR' | 'EXHIBITOR') => {
  const form = await getActiveEventForm(eventId, target);

  if (!form) {
    throw new AppError('Active form not found for this event', 404, ERROR_TYPES.NOT_FOUND);
  }

  return form;
};

export const getEventFormService = async (id: string) => {
  const form = await getEventFormById(id);

  if (!form) {
    throw new AppError('Event form not found', 404, ERROR_TYPES.NOT_FOUND);
  }

  return form;
};

export const updateEventFormService = async (id: string, data: UpdateEventFormData) => {
  const form = await getEventFormById(id);

  if (!form) {
    throw new AppError('Event form not found', 404, ERROR_TYPES.NOT_FOUND);
  }

  return await updateEventForm(id, data);
};

export const deleteEventFormService = async (id: string) => {
  const form = await getEventFormById(id);

  if (!form) {
    throw new AppError('Event form not found', 404, ERROR_TYPES.NOT_FOUND);
  }

  await deleteEventForm(id);
};
