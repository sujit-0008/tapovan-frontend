
import { useQuery } from '@tanstack/react-query';
import { getFacilities } from '../services/studentFacilityService';
import { GetFacilitiesResponse } from '../types/studentFacility';

export const useFacilities = () => {
  return useQuery<GetFacilitiesResponse, Error>({
    queryKey: ['facilities'],
    queryFn: getFacilities,
  });
};
