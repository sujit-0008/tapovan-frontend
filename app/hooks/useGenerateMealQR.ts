import { useMutation } from '@tanstack/react-query';
import { generateMealQR } from '../services/canteenService';
import { GenerateMealQRRequest, GenerateMealQRResponse } from '../types/canteen';

export const useGenerateMealQR = () => {
  return useMutation<GenerateMealQRResponse, Error, GenerateMealQRRequest>({
    mutationFn: generateMealQR,
    onError: (error) => {
      console.error('Generate QR error:', error.message);
    },
  });
};