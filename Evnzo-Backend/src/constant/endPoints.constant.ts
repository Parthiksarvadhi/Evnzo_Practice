export const END_POINTS = {
  V1: '/api/v1',
  COMMON: '/api',
  AUTH: '/auth',
  USER: '/user',
  HEALTH: '/health',
  EVENT: '/event',
  EVENT_FORM: '/event-form',
  FORM_FIELD: '/form-field',
  FORM_SUBMISSION: '/form-submission',
} as const;

export type EndpointKey = keyof typeof END_POINTS;
