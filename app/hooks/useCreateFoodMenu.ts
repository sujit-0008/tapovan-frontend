
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFoodMenu } from '../services/canteenService';
import { CreateFoodMenuRequest, CreateFoodMenuResponse } from '../types/canteen';

export const useCreateFoodMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateFoodMenuResponse, Error, CreateFoodMenuRequest>({
    mutationFn: createFoodMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foodMenus'] });
    },
    onError: (error) => {
      console.error('Create menu error:', error.message);
    },
  });
};