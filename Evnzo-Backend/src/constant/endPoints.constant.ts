export const END_POINTS = {
  V1: '/api/v1',
  COMMON: '/api',
  AUTH: '/auth',
  USER: '/user',
  HEALTH: '/health',
  USER: '/users',
  AUTH: '/auth',
  EVENT_FORMS: '/event-forms',
  FORM_FIELDS: '/form-fields',
  FORM_SUBMISSIONS: '/form-submissions',
} as const;

export type EndpointKey = keyof typeof END_POINTS;
