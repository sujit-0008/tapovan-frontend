import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoom } from '../services/roomService';
import { CreateRoomRequest, CreateRoomResponse } from '../types/room';

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateRoomResponse, Error, CreateRoomRequest>({
    mutationFn: (data) => createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['availableRooms'] });
    },
  });
};
