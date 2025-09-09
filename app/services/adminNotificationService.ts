import api from './api';
import { API_ROUTES } from '../constants/api';
import { NotificationsResponse, NotificationsQueryParams } from '../types/adminNotification';

export const getNotifications = async (params: NotificationsQueryParams = {}): Promise<NotificationsResponse> => {
  const response = await api.get<NotificationsResponse>(API_ROUTES.NOTIFICATIONS.GET, { params });
  return response.data;
};