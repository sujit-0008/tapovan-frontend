import api from './api';
import { API_ROUTES } from '../constants/api';
import {
  CreateRoomRequest,
  CreateRoomResponse,
  UpdateRoomRequest,
  UpdateRoomResponse,
  DeleteRoomResponse,
  GetAllRoomsResponse,
  GetRoomByIdResponse,
  GetAvailableRoomsResponse,
  AssignStudentToRoomRequest,
  AssignStudentToRoomResponse,
  UpdateRoomAssignmentRequest,
  UpdateRoomAssignmentResponse,
  VacateStudentFromRoomResponse,
  GetRoomOccupancyReportResponse,
  GetStudentRoomAssignmentResponse,
  GetStudentAssignmentHistoryResponse,
  RoomFilters,
} from '../types/room';

export const createRoom = async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
  const response = await api.post<CreateRoomResponse>(API_ROUTES.ROOM.CREATE, data);
  return response.data;
};

export const getAllRooms = async (filters: RoomFilters = {}): Promise<GetAllRoomsResponse> => {
  const response = await api.get<GetAllRoomsResponse>(API_ROUTES.ROOM.ALL, { params: filters });
  return response.data;
};

export const getRoomById = async (roomId: number): Promise<GetRoomByIdResponse> => {
  const response = await api.get<GetRoomByIdResponse>(
    API_ROUTES.ROOM.GET_BY_ID.replace(':roomId', roomId.toString())
  );
  return response.data;
};

export const updateRoom = async (roomId: number, data: UpdateRoomRequest): Promise<UpdateRoomResponse> => {
  const response = await api.put<UpdateRoomResponse>(
    API_ROUTES.ROOM.UPDATE.replace(':roomId', roomId.toString()),
    data
  );
  return response.data;
};

export const deleteRoom = async (roomId: number): Promise<DeleteRoomResponse> => {
  const response = await api.delete<DeleteRoomResponse>(
    API_ROUTES.ROOM.DELETE.replace(':roomId', roomId.toString())
  );
  return response.data;
};

export const getAvailableRooms = async (): Promise<GetAvailableRoomsResponse> => {
  const response = await api.get<GetAvailableRoomsResponse>(API_ROUTES.ROOM.AVAILABLE);
  return response.data;
};

export const assignStudentToRoom = async (
  data: AssignStudentToRoomRequest
): Promise<AssignStudentToRoomResponse> => {
  const response = await api.post<AssignStudentToRoomResponse>(API_ROUTES.ROOM.ASSIGN_STUDENT, data);
  return response.data;
};

export const updateRoomAssignment = async (
  assignmentId: number,
  data: UpdateRoomAssignmentRequest
): Promise<UpdateRoomAssignmentResponse> => {
  const response = await api.put<UpdateRoomAssignmentResponse>(
    API_ROUTES.ROOM.UPDATE_ASSIGNMENT.replace(':assignmentId', assignmentId.toString()),
    data
  );
  return response.data;
};

export const vacateStudentFromRoom = async (
  assignmentId: number
): Promise<VacateStudentFromRoomResponse> => {
  const response = await api.post<VacateStudentFromRoomResponse>(
    API_ROUTES.ROOM.VACATE_STUDENT.replace(':assignmentId', assignmentId.toString())
  );
  return response.data;
};

export const getRoomOccupancyReport = async (): Promise<GetRoomOccupancyReportResponse> => {
  const response = await api.get<GetRoomOccupancyReportResponse>(API_ROUTES.ROOM.OCCUPANCY_REPORT);
  return response.data;
};

export const getStudentRoomAssignment = async (
  studentId: string
): Promise<GetStudentRoomAssignmentResponse> => {
  const response = await api.get<GetStudentRoomAssignmentResponse>(
    API_ROUTES.ROOM.GET_STUDENT_ASSIGNMENT.replace(':studentId', studentId)
  );
  return response.data;
};

export const getStudentAssignmentHistory = async (
  studentId: string
): Promise<GetStudentAssignmentHistoryResponse> => {
  const response = await api.get<GetStudentAssignmentHistoryResponse>(
    API_ROUTES.ROOM.GET_STUDENT_HISTORY.replace(':studentId', studentId)
  );
  return response.data;
};
