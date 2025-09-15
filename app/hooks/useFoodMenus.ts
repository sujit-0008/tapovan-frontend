
import { useQuery } from '@tanstack/react-query';
import { getFoodMenus } from '../services/canteenService';
import { GetFoodMenusResponse } from '../types/canteen';

export const useFoodMenus = (date?: string) => {
  return useQuery<GetFoodMenusResponse, Error>({
    queryKey: ['foodMenus', date],
    queryFn: () => getFoodMenus(date),
  });
};
