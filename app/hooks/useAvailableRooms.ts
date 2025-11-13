import { useQuery } from '@tanstack/react-query';
import { getAvailableRooms } from '../services/roomService';
import { GetAvailableRoomsResponse } from '../types/room';

export const useAvailableRooms = () => {
  return useQuery<GetAvailableRoomsResponse, Error>({
    queryKey: ['availableRooms'],
    queryFn: () => getAvailableRooms(),
  });
};
