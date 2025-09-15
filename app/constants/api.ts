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
    ALL: '/api/admin/students',
    EDIT: '/api/student/edit/student/:id',

  },
  VENDOR: {
    REGISTER: '/api/register/vendor',
    DETAILS: '/api/admin/vendors/:id',
    APPROVE: '/api/admin/approve/vendor/:id',
    ALL: '/api/admin/vendors',
    EDIT: '/api/edit/vendor/:id',
  },
  CANTEEN: {
    GENERATE_MEAL_QR: '/api/generate-qr', // New
    CREATE_FOOD_MENU: '/api/food-menu', // New
    UPDATE_FOOD_MENU: '/api/food-menu/:id', // New
    GET_MEAL_SKIPS: '/api/meal-skips', // New
    GET_FOOD_MENUS: '/api/admin/canteen/food-menus', // New

  },


  NOTIFICATIONS: {
    GET: '/api/admin/notifications',
  },
  PAYMENT: {
    CREATE: '/api/admin/payments',
    UPDATE: '/api/admin//payments/:id',
    HISTORY: '/api/admin/payments/student/:studentId',
  },
} as const;