export interface StudentLeave {
  id: number;
  studentId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roomNumber: string | null;
  };
}

export interface CreateLeaveRequest {
  startDate: string;
  endDate: string;
  reason: string;
}

export interface UpdateLeaveRequest {
  startDate?: string;
  endDate?: string;
  reason?: string;
}

export interface UpdateLeaveStatusRequest {
  status: 'APPROVED' | 'REJECTED';
}

export interface LeaveListResponse {
  leaves: StudentLeave[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AbsentCountResponse {
  absentCount: number;
}

export interface MyLeavesResponse {
  leaves: StudentLeave[];
}