import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRoom } from '../services/roomService';
import { DeleteRoomResponse } from '../types/room';

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteRoomResponse, Error, number>({
    mutationFn: (roomId) => deleteRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['availableRooms'] });
    },
  });
};
