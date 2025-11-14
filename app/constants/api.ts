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
    //facility and meal management
    MEAL_CHECKIN: '/api/student/meal/checkin', // New
    SKIP_MEAL: '/api/student/meal/skip', // New
    CREATE_BOOKING: '/api/student/bookings/create', // New
    CREATE_SOS_ALERT: '/api/student/sos/create', // New
    CREATE_TICKET: '/api/student/tickets/create', // New

    GET_FACILITIES: '/api/student/facilities', // New (assumed)
    GET_BOOKINGS: '/api/student/bookings', // New (assumed)

  },
  VENDOR: {
    REGISTER: '/api/register/vendor',
    DETAILS: '/api/admin/vendors/:id',
    APPROVE: '/api/admin/approve/vendor/:id',
    ALL: '/api/admin/vendors',
    EDIT: '/api/edit/vendor/:id',
  },

  STAFF: {
    CREATE: '/api/admin/user/createStaff',
    ALL: '/api/admin/user/staff',
    EDIT: '/api/admin/user/editStaff/:id',
    DELETE: '/api/admin/user/deleteStaff/:id',
    VENDORS: '/api/admin/user/vendorsList',
  },

  CANTEEN: {
    GENERATE_MEAL_QR: '/api/generate-qr', // New
    CREATE_FOOD_MENU: '/api/food-menu', // New
    UPDATE_FOOD_MENU: '/api/food-menu/:id', // New
    GET_MEAL_SKIPS: '/api/meal-skips', // New
    GET_FOOD_MENUS: '/api/admin/canteen/food-menus', // New

  },
   PARENT: {
    GET_ATTENDANCE: '/api/parent/parentinfo', // New: Parent attendance
  },


  NOTIFICATIONS: {
    GET: '/api/admin/notifications',
  },
  PAYMENT: {
    CREATE: '/api/admin/payments',
    UPDATE: '/api/admin//payments/:id',
    HISTORY: '/api/admin/payments/student/:studentId',
  },
  ROOM: {
    CREATE: '/api/admin/rooms',
    ALL: '/api/admin/rooms',
    GET_BY_ID: '/api/admin/rooms/:roomId',
    UPDATE: '/api/admin/rooms/:roomId',
    DELETE: '/api/admin/rooms/:roomId',
    AVAILABLE: '/api/admin/rooms/available',
    OCCUPANCY_REPORT: '/api/admin/rooms/report/occupancy',
    ASSIGN_STUDENT: '/api/admin/room-assignments',
    UPDATE_ASSIGNMENT: '/api/admin/room-assignments/:assignmentId',
    VACATE_STUDENT: '/api/admin/room-assignments/:assignmentId/vacate',
    GET_STUDENT_ASSIGNMENT: '/api/admin/students/:studentId/room-assignment',
    GET_STUDENT_HISTORY: '/api/admin/students/:studentId/room-assignment-history',
  },

   TICKETS: {
    GET: '/api/admin/tickets',
    UPDATE: '/api/admin/tickets/:id',
    ASSIGN_BY_SKILLS: '/api/admin/:ticketId/assign-by-skills',
  },
  STAFF_BY_SKILLS: {
    BY_SKILLS: '/api/admin/staff/by-skills',
  },
  SKILLS: {
    FOR_CATEGORY: '/api/admin/skills/mapping',
  },
} as const;