import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRoom } from '../services/roomService';
import { UpdateRoomRequest, UpdateRoomResponse } from '../types/room';

export const useUpdateRoom = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateRoomResponse, Error, UpdateRoomRequest>({
    mutationFn: (data) => updateRoom(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['availableRooms'] });
    },
  });
};
