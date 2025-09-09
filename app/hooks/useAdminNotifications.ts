import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../services/adminNotificationService';
import { NotificationsQueryParams } from '../types/adminNotification';

export const useNotifications = (params: NotificationsQueryParams = { status: 'PENDING' }) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => getNotifications(params),
    refetchInterval: 60000, // Refetch every 60 seconds
  });
};