
export type TicketStatus = 'PENDING' | 'IN_PROGRESS' | 'CLOSED';

export interface Ticket {
  id: number;
  category: string;
  description: string;
  severity?: string | null;
  photoUrl?: string | null;
  roomNumber?: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'CLOSED';
  closureNote?: string | null;
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

// For staff-specific detailed ticket view
export interface AuditLog {
  id: number;
  action: string;
  details: string;
  timestamp: string;
}

export interface StaffTicket extends Ticket {
  assignedToVendor?: {
    id: number;
    name: string;
    email: string;
  };
  auditLogs?: AuditLog[];
}

export interface StaffTicketsResponse {
  tickets: StaffTicket[];
  total: number;
  page: number;
  pages: number;
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
export interface ReassignTicketPayload {
  staffId: number;
  reason?: string;
}

export interface ReassignTicketResponse {
  message: string;
  ticket: Ticket;
  previousAssignee: {
    id: number;
    name: string;
  };
  newAssignee: {
    id: number;
    name: string;
    email: string;
    skills: string[];
    activeTickets: number;
  };
}