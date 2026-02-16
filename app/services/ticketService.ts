import api from './api';
import { API_ROUTES } from '../constants/api';
import {
  TicketsResponse,
  StaffBySkillsResponse,
  SkillMapping,
  StaffTicket,
  StaffTicketsResponse,
  ReassignTicketResponse,

} from '../types/ticket';

export const getTickets = async (
  status: string = 'PENDING',
  page: number = 1
): Promise<TicketsResponse> => {
  const response = await api.get<TicketsResponse>(API_ROUTES.TICKET.ALL, {
    params: { status, page },
  });
  return response.data;
};

export const updateTicketStatus = async (
  id: string,
  status: 'PENDING' | 'IN_PROGRESS' | 'CLOSED',
  assignedToAdminId?: number,
  assignedToVendorId?: number,
  note?: string
) => {
  const response = await api.post(
    API_ROUTES.TICKET.UPDATE.replace(':id', id),
    { status, assignedToAdminId, assignedToVendorId, note }
  );
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const assignTicketBySkills = async (ticketId: string): Promise<any> => {
  const response = await api.post(
    API_ROUTES.TICKET.ASSIGN_BY_SKILLS.replace(':id', ticketId), {}
  );
  return response.data;
};

// Staff-specific services
export const getMyAssignedTickets = async (
  status: string = '',
  page: number = 1
): Promise<StaffTicketsResponse> => {
  const response = await api.get<StaffTicketsResponse>(API_ROUTES.TICKET.STAFF_ASSIGNED, {
    params: { status, page },
  });
  return response.data;
};

export const getMyTicketDetails = async (id: string): Promise<{ ticket: StaffTicket }> => {
  const response = await api.get<{ ticket: StaffTicket }>(
    API_ROUTES.TICKET.STAFF_DETAILS.replace(':id', id)
  );
  return response.data;
};

export const updateMyTicketStatus = async (
  id: string,
  status: 'PENDING' | 'IN_PROGRESS' | 'CLOSED',
  note?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const response = await api.post(
    API_ROUTES.TICKET.STAFF_UPDATE_STATUS.replace(':id', id),
    { status, note }
  );
  return response.data;
};

export const getStaffBySkills = async (skills: string): Promise<StaffBySkillsResponse> => {
  const response = await api.get<StaffBySkillsResponse>(API_ROUTES.TICKET.STAFF_BY_SKILLS, {
    params: { skills },
  });
  return response.data;
};

export const getSkillsForCategory = async (): Promise<{ skillMapping: SkillMapping }> => {
  const response = await api.get(API_ROUTES.TICKET.SKILLS_FOR_CATEGORY);
  return response.data;
};

export const reassignTicketBySkills = async (
  ticketId: string,
  staffId: number,
  reason?: string
): Promise<ReassignTicketResponse> => {
  const response = await api.post<ReassignTicketResponse>(
    API_ROUTES.TICKET.REASSIGN_TICKET.replace(':ticketId', ticketId),
    { staffId, reason }
  );
  return response.data;
};