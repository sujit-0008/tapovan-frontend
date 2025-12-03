// src/hooks/useTickets.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTickets, assignTicketBySkills, updateTicketStatus, getStaffBySkills, getSkillsForCategory } from '../services/ticketService';
export const useTickets = (status = 'PENDING', page = 1) => {
  return useQuery({
    queryKey: ['tickets', status, page],
    queryFn: () => getTickets(status, page),
  });
};

// This mutation is for assigning a ticket by skills automatically
export const useAssignTicketBySkills = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: assignTicketBySkills,
    // Invalidate tickets query on success to refetch the list
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets'] }),
  });
};

// src/hooks/useUpdateTicketStatus.ts
export const useUpdateTicketStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (variables: { id: string; status: 'PENDING' | 'IN_PROGRESS' | 'CLOSED'; assignedToAdminId?: number; assignedToVendorId?: number }) => updateTicketStatus(variables.id, variables.status, variables.assignedToAdminId, variables.assignedToVendorId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets'] }),
  });
};

// src/hooks/useStaffBySkills.ts
export const useStaffBySkills = (skills: string) => {
  return useQuery({
    queryKey: ['staff-by-skills', skills],
    queryFn: () => getStaffBySkills(skills),
    enabled: !!skills,
  });
};

// src/hooks/useSkillsForCategory.ts
export const useSkillsForCategory = () => {
  return useQuery({
    queryKey: ['skills-for-category'],
    queryFn: getSkillsForCategory,
  });
};