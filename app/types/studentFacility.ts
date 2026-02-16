
export interface MealCheckinRequest {
  data: string;
}

export interface MealCheckinResponse {
  message: string;
  checkin: {
    id: number;
    studentId: number;
    vendorId: number;
    mealType: string;
    date: string;
    time: string;
  };
}

export interface SkipMealRequest {
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'ALL';
  date: string;
}

export interface SkipMealResponse {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skip: any; // Array or single object based on mealType
}

export interface Facility {
  id: number;
  name: string;
  operationalHours: string;
  slot?: string | null;
  capacity: number;
}

export interface Booking {
  id: number;
  facilityId: number;
  studentId: number;
  slotStart: string;
  slotEnd: string;
  status: 'CONFIRMED' | 'CANCELLED';
  facility: Facility;
}

export interface CreateBookingRequest {
  facilityId: number;
  slotStart: string;
  slotEnd: string;
}

export interface CreateBookingResponse {
  message: string;
  booking: Booking;
}

export interface SOSAlert {
  id: number;
  studentId: number;
  latitude: number;
  longitude: number;
  message: string;
  status: 'PENDING' | 'RESOLVED';
  timestamp: string;
}

export interface CreateSOSAlertRequest {
  latitude: number;
  longitude: number;
}

export interface CreateSOSAlertResponse {
  message: string;
  sosAlert: SOSAlert;
}

export interface Ticket {
  id: number;
  category: string;
  description: string;
  severity?: string | null;
  photoUrl?: string | null;
  roomNumber?: string | null;
  closureNote?: string | null;
  status?: string;
  raisedById: number;
  createdAt: string;
}

export interface CreateTicketRequest {
  category: string;
  description: string;
  severity?: string;
  roomNumber?: string;
  //photo?: File | null;
}

export interface CreateTicketResponse {
  message: string;
  ticket: Ticket;
}

export interface GetRoomTicketsResponse {
  tickets: Ticket[];
}

export interface GetFacilitiesResponse {
  facilities: Facility[];
}

export interface GetBookingsResponse {
  bookings: Booking[];
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}