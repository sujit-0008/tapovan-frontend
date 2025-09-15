
import { useQuery } from '@tanstack/react-query';
import { getMealSkips } from '../services/canteenService';
import { GetMealSkipsResponse } from '../types/canteen';

export const useMealSkips = () => {
  return useQuery<GetMealSkipsResponse, Error>({
    queryKey: ['mealSkips'],
    queryFn: getMealSkips,
  });
};
