export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',

  // Event Forms
  EVENT_FORMS: '/event-forms',
  EVENT_FORM_BY_ID: (id: string) => `/event-forms/${id}`,
  ACTIVE_EVENT_FORM: (eventId: string, target: string) =>
    `/event-forms/${eventId}/active?target=${target}`,

  // Form Fields
  FORM_FIELDS: '/form-fields',
  FORM_FIELDS_BY_FORM: (formId: string) => `/form-fields/${formId}`,
  FORM_FIELD_BY_ID: (id: string) => `/form-fields/${id}`,

  // Form Submissions
  FORM_SUBMISSIONS: '/form-submissions',
  FORM_SUBMISSION_BY_ID: (id: string) => `/form-submissions/${id}`,
  FORM_SUBMISSIONS_LIST: (formId: string) => `/form-submissions/form/${formId}`,
} as const;
