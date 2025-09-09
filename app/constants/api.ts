export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REFRESH: '/api/auth/refresh-token',
    LOGOUT: '/api/auth/logout',
    REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  STUDENT: {
    REGISTER: '/api/student/register/student',
    DETAILS: '/api/admin/student/:id',
    APPROVE: '/api/admin/approve/student/:id',
  },
  VENDOR: {
    REGISTER: '/api/register/vendor',
    DETAILS: '/api/admin/vendors/:id',
    APPROVE: '/api/admin/approve/vendor/:id',
    ALL: '/api/admin/vendors',
  },
  NOTIFICATIONS: {
    GET: '/api/admin/notifications',
  },
} as const;