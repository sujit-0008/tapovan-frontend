import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignStudentToRoom } from '../services/roomService';
import { AssignStudentToRoomRequest, AssignStudentToRoomResponse } from '../types/room';

export const useAssignStudentToRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<AssignStudentToRoomResponse, Error, AssignStudentToRoomRequest>({
    mutationFn: (data) => assignStudentToRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['availableRooms'] });
    },
  });
};
