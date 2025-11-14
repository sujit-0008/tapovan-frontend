
export type TicketStatus = 'PENDING' | 'IN_PROGRESS' | 'CLOSED';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: string;
  status: TicketStatus;
  createdAt: string;
  assignedToAdminId?: number | null;
  assignedToVendorId?: number | null;
  raisedBy: {
    firstName: string;
    lastName: string;
  };
  assignedToAdmin?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  } | null;
}

export interface GetTicketsResponse {
  tickets: Ticket[];
  total: number;
  page: number;
  pages: number;
}

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  activeTickets: number;
}
// export interface CreateTicketRequest {
//   category: string;
//   description: string;
//   severity?: string;
//   roomNumber?: string;
//   file?: File; // Added file property
// }
export interface CreateTicketResponse {
  ticketId: number;
  message: string;
}
export interface UpdateTicketRequest {
  status: TicketStatus;
  assignedToAdminId?: number | null;
  assignedToVendorId?: number | null;
}

export interface SkillMapping {
  [category: string]: string[];
}
