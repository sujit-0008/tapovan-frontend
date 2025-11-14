
import api from './api';
import { API_ROUTES } from '../constants/api';
import {
  GetTicketsResponse,
  UpdateTicketRequest,
  StaffMember,
  SkillMapping,
} from '../types/ticket';

export const getTickets = async (
  status: string = 'PENDING',
  page: number = 1
): Promise<GetTicketsResponse> => {
  const response = await api.get<GetTicketsResponse>(API_ROUTES.TICKETS.GET, {
    params: { status, page },
  });
  return response.data;
};

export const updateTicket = async (
  id: string,
  data: UpdateTicketRequest
) => {
  const response = await api.put(
    API_ROUTES.TICKETS.UPDATE.replace(':id', id),
    data
  );
  return response.data;
};

export const assignTicketBySkills = async (ticketId: string) => {
  const response = await api.post(
    API_ROUTES.TICKETS.ASSIGN_BY_SKILLS.replace(':id', ticketId)
  );
  return response.data;
};

export const getStaffBySkills = async (skills?: string): Promise<{ staff: StaffMember[] }> => {
  const response = await api.get(API_ROUTES. STAFF_BY_SKILLS.BY_SKILLS, {
    params: { skills },
  });
  return response.data;
};

export const getSkillsForCategory = async (): Promise<{ skillMapping: SkillMapping }> => {
  const response = await api.get(API_ROUTES.SKILLS.FOR_CATEGORY);
  return response.data;
};
