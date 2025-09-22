
import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../services/studentFacilityService';
import { GetBookingsResponse } from '../types/studentFacility';

export const useBookings = () => {
  return useQuery<GetBookingsResponse, Error>({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });
};