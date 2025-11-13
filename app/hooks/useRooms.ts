import { useQuery } from '@tanstack/react-query';
import { getAllRooms } from '../services/roomService';
import { GetAllRoomsResponse, RoomFilters } from '../types/room';

export const useRooms = (filters: RoomFilters = {}) => {
  return useQuery<GetAllRoomsResponse, Error>({
    queryKey: ['rooms', filters],
    queryFn: () => getAllRooms(filters),
  });
};
