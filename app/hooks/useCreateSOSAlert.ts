
import { useMutation } from '@tanstack/react-query';
import { createSOSAlert } from '../services/studentFacilityService';
import { CreateSOSAlertRequest, CreateSOSAlertResponse } from '../types/studentFacility';

export const useCreateSOSAlert = () => {
  return useMutation<CreateSOSAlertResponse, Error, CreateSOSAlertRequest>({
    mutationFn: createSOSAlert,
    onError: (error) => {
      console.error('Create SOS alert error:', error.message);
    },
  });
}