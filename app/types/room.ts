export interface Room {
  id: number;
  roomNumber: string;
  floor: number | null;
  building: string | null;
  capacity: number;
  roomType: string | null;
  amenities: string[];
  description: string | null;
  isActive: boolean;
  maintenanceNotes: string | null;
  createdAt: string;
  updatedAt: string;
  assignments: RoomAssignment[];
}

export interface RoomAssignment {
  id: number;
  roomId: number;
  studentId: string;
  status: 'ACTIVE' | 'VACATED';
  notes: string | null;
  assignedDate: string;
  vacatedDate: string | null;
  room?: Room;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    rollNumber?: string;
  };
}

export interface CreateRoomRequest {
  roomNumber: string;
  floor?: number;
  building?: string;
  capacity: number;
  roomType?: string;
  amenities?: string[];
  description?: string;
  isActive?: boolean;
  maintenanceNotes?: string;
}

export interface CreateRoomResponse {
  message: string;
  data: Room;
}

export interface UpdateRoomRequest {
  roomNumber?: string;
  floor?: number;
  building?: string;
  capacity?: number;
  roomType?: string;
  amenities?: string[];
  description?: string;
  isActive?: boolean;
  maintenanceNotes?: string;
}

export interface UpdateRoomResponse {
  message: string;
  data: Room;
}

export interface DeleteRoomResponse {
  message: string;
}

export interface GetAllRoomsResponse {
  message: string;
  data: Room[];
}

export interface GetRoomByIdResponse {
  message: string;
  data: Room;
}

export interface GetAvailableRoomsResponse {
  message: string;
  data: (Room & { availableSlots: number })[];
}

export interface AssignStudentToRoomRequest {
  roomId: number;
  studentId: string;
  notes?: string;
}

export interface AssignStudentToRoomResponse {
  message: string;
  data: RoomAssignment;
}

export interface UpdateRoomAssignmentRequest {
  roomId?: number;
  status?: 'ACTIVE' | 'VACATED';
  notes?: string;
}

export interface UpdateRoomAssignmentResponse {
  message: string;
  data: RoomAssignment;
}

export interface VacateStudentFromRoomResponse {
  message: string;
  data: RoomAssignment;
}

export interface GetRoomOccupancyReportResponse {
  message: string;
  data: Array<{
    id: number;
    roomNumber: string;
    building: string | null;
    floor: number | null;
    capacity: number;
    occupied: number;
    available: number;
    occupancyPercentage: number;
    isActive: boolean;
  }>;
}

export interface GetStudentRoomAssignmentResponse {
  message: string;
  data: RoomAssignment;
}

export interface GetStudentAssignmentHistoryResponse {
  message: string;
  data: RoomAssignment[];
}

export interface RoomFilters {
  building?: string;
  floor?: number;
  isActive?: boolean;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
}
