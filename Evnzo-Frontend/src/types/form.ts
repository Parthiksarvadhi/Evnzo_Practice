export type FormTarget = 'VISITOR' | 'EXHIBITOR';

export type FieldType =
  | 'TEXT'
  | 'TEXTAREA'
  | 'EMAIL'
  | 'NUMBER'
  | 'DROPDOWN'
  | 'CHECKBOX'
  | 'RADIO'
  | 'FILE';

export interface FormField {
  id: string;
  formId: string;
  name: string;
  label: string;
  type: FieldType;
  isRequired: boolean;
  options: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventForm {
  id: string;
  eventId: string;
  target: FormTarget;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  fields?: FormField[];
}

export interface FormAnswer {
  fieldId: string;
  value: string | null;
}

export interface FormSubmission {
  id: string;
  formId: string;
  userId?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  answers: FormAnswer[];
}

// API Payloads
export interface CreateEventFormPayload {
  eventId: string;
  target: FormTarget;
  title: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateEventFormPayload {
  title?: string;
  description?: string;
  isActive?: boolean;
}

export interface AddFormFieldPayload {
  formId: string;
  name: string;
  label: string;
  type: FieldType;
  isRequired?: boolean;
  options?: string[];
  order?: number;
}

export interface UpdateFormFieldPayload {
  label?: string;
  isRequired?: boolean;
  options?: string[];
  order?: number;
}

export interface SubmitFormPayload {
  formId: string;
  userId?: number;
  answers: FormAnswer[];
}
