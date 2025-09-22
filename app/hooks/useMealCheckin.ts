
import { useMutation } from '@tanstack/react-query';
import { mealCheckin } from '../services/studentFacilityService';
import { MealCheckinRequest, MealCheckinResponse } from '../types/studentFacility';

export const useMealCheckin = () => {
  return useMutation<MealCheckinResponse, Error, MealCheckinRequest>({
    mutationFn: mealCheckin,
    onError: (error) => {
      console.error('Meal check-in error:', error.message);
    },
  });
};
