
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFoodMenu } from '../services/canteenService';
import { UpdateFoodMenuRequest, UpdateFoodMenuResponse } from '../types/canteen';

export const useUpdateFoodMenu = (menuId: string) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateFoodMenuResponse, Error, UpdateFoodMenuRequest>({
    mutationFn: (data) => updateFoodMenu(menuId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foodMenus'] });
    },
    onError: (error) => {
      console.error('Update menu error:', error.message);
    },
  });
};
