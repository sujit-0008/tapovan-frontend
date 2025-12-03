
export type TicketStatus = 'PENDING' | 'IN_PROGRESS' | 'CLOSED';

export interface Ticket {
  id: number;
  category: string;
  description: string;
  severity?: string | null;
  photoUrl?: string | null;
  roomNumber?: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'CLOSED';
  assignedToAdminId?: number | null;
  assignedToVendorId?: number | null;
  createdAt: string;
  raisedBy: {
    firstName: string;
    lastName: string;
  };
  assignedToAdmin?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    skills: string[];
  };
}

export interface TicketsResponse {
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

export interface StaffBySkillsResponse {
  staff: StaffMember[];
}

export interface SkillMapping {
  [category: string]: string[];
}