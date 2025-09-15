export interface LoginCredentials {
  email: string;
  password: string;
}

export type UserRole = 'STUDENT' | 'ADMIN' | 'FACILITY_ADMIN' | 'STAFF' | 'PARENT' | 'VENDOR';

export interface LoginResponse {
  message: string;
  userType: UserRole;
  id:string;
}

export interface RefreshResponse {
  message: string;
  userType: UserRole;
}

export interface LogoutResponse {
  message: string;
}

export interface RequestPasswordResetCredentials {
  email: string;
}

export interface RequestPasswordResetResponse {
  message: string;
}

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ErrorResponse {
  errors: string[];
}