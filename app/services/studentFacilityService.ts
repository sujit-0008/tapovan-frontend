import api from './api';
import { API_ROUTES } from '../constants/api';
import { MealCheckinRequest, MealCheckinResponse, SkipMealRequest, SkipMealResponse, CreateBookingRequest, CreateBookingResponse, CreateSOSAlertRequest, CreateSOSAlertResponse, CreateTicketRequest, CreateTicketResponse, GetFacilitiesResponse, GetBookingsResponse 

} from '../types/studentFacility';

export const mealCheckin = async (data: MealCheckinRequest): Promise<MealCheckinResponse> => {
  const response = await api.get<MealCheckinResponse>(API_ROUTES.STUDENT.MEAL_CHECKIN, { params: data });
  return response.data;
};

export const skipMeal = async (data: SkipMealRequest): Promise<SkipMealResponse> => {
  const response = await api.post<SkipMealResponse>(API_ROUTES.STUDENT.SKIP_MEAL, data);
  return response.data;
};

export const createBooking = async (data: CreateBookingRequest): Promise<CreateBookingResponse> => {
  const response = await api.post<CreateBookingResponse>(API_ROUTES.STUDENT.CREATE_BOOKING, data);
  return response.data;
};

export const createSOSAlert = async (data: CreateSOSAlertRequest): Promise<CreateSOSAlertResponse> => {
  const response = await api.post<CreateSOSAlertResponse>(API_ROUTES.STUDENT.CREATE_SOS_ALERT, data);
  return response.data;
};

export const createTicket = async (
  data: CreateTicketRequest,
  file?: File
): Promise<CreateTicketResponse> => {
  // If a file is provided send multipart/form-data, otherwise send JSON
  if (file) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    formData.append('photo', file);
    const response = await api.post<CreateTicketResponse>(API_ROUTES.STUDENT.CREATE_TICKET, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } else {
    const response = await api.post<CreateTicketResponse>(API_ROUTES.STUDENT.CREATE_TICKET, data);
    return response.data;
  }
};

export const getFacilities = async (): Promise<GetFacilitiesResponse> => {
  const response = await api.get<GetFacilitiesResponse>(API_ROUTES.STUDENT.GET_FACILITIES);
  return response.data;
};

export const getBookings = async (): Promise<GetBookingsResponse> => {
  const response = await api.get<GetBookingsResponse>(API_ROUTES.STUDENT.GET_BOOKINGS);
  return response.data;
};