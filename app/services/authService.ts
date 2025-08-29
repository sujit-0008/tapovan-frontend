import api from './api';
import { API_ROUTES } from '../constants/api';
import { LoginCredentials, LoginResponse, RefreshResponse, LogoutResponse, RequestPasswordResetCredentials, RequestPasswordResetResponse, ResetPasswordCredentials, ResetPasswordResponse } from '../types';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, credentials);
  return response.data;
};

export const refreshToken = async (): Promise<RefreshResponse> => {
  const response = await api.post<RefreshResponse>(API_ROUTES.AUTH.REFRESH);
  return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>(API_ROUTES.AUTH.LOGOUT);
  return response.data;
};


export const requestPasswordReset = async (
  credentials: RequestPasswordResetCredentials
): Promise<RequestPasswordResetResponse> => {
  const response = await api.post<RequestPasswordResetResponse>(
    API_ROUTES.AUTH.REQUEST_PASSWORD_RESET,
    credentials
  );
  return response.data;
};

export const resetPassword = async (
  credentials: ResetPasswordCredentials
): Promise<ResetPasswordResponse> => {
  const response = await api.post<ResetPasswordResponse>(
    API_ROUTES.AUTH.RESET_PASSWORD,
    credentials
  );
  return response.data;
};