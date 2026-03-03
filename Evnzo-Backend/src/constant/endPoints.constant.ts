export const END_POINTS = {
  COMMON: '/api',
  V1: '/v1',
  HEALTH: '/health',
  USER: '/users',
  AUTH: '/auth',
  EVENT_FORMS: '/event-forms',
  FORM_FIELDS: '/form-fields',
  FORM_SUBMISSIONS: '/form-submissions',
} as const;

export type EndpointKey = keyof typeof END_POINTS;

