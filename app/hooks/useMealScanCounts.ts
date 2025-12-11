import { useQuery } from '@tanstack/react-query';
import { getMealScanCounts } from '../services/canteenService';
import { GetMealScanCountsRequest, GetMealScanCountsResponse } from '../types/canteen';

export const useMealScanCounts = (params?: GetMealScanCountsRequest) => {
  return useQuery<GetMealScanCountsResponse, Error>({
    queryKey: ['mealScanCounts', params?.date || 'today'],
    queryFn: () => getMealScanCounts(params?.date || 'today'),
    enabled: !!params?.date,
  });
};