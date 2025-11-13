import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRoomAssignment } from '../services/roomService';
import { UpdateRoomAssignmentRequest, UpdateRoomAssignmentResponse } from '../types/room';

export const useUpdateRoomAssignment = (assignmentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateRoomAssignmentResponse, Error, UpdateRoomAssignmentRequest>({
    mutationFn: (data) => updateRoomAssignment(assignmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['availableRooms'] });
    },
  });
};
