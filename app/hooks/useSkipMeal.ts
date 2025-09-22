
import { useMutation } from '@tanstack/react-query';
import { skipMeal } from '../services/studentFacilityService';
import { SkipMealRequest, SkipMealResponse } from '../types/studentFacility';

export const useSkipMeal = () => {
  return useMutation<SkipMealResponse, Error, SkipMealRequest>({
    mutationFn: skipMeal,
    onError: (error) => {
      console.error('Skip meal error:', error.message);
    },
  });
};
