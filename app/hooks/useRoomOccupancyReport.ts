import { useQuery } from '@tanstack/react-query';
import { getRoomOccupancyReport } from '../services/roomService';
import { GetRoomOccupancyReportResponse } from '../types/room';

export const useRoomOccupancyReport = () => {
  return useQuery<GetRoomOccupancyReportResponse, Error>({
    queryKey: ['roomOccupancyReport'],
    queryFn: () => getRoomOccupancyReport(),
  });
};
