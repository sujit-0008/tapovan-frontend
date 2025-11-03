
export interface Staff {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: 'STAFF';
  skills: string[];
  isTapovanNest: boolean;
  vendorId?: number | null;
  address?: string | null;
  department?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  vendor?: {
    id: number;
    companyName?: string | null;
    name: string;
    companyEmail?: string | null;
    companyPhone?: string | null;
    companyAddress?: string | null;
    address: string;
  };
}

export interface CreateStaffRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  skills: string[];
  isTapovanNest: boolean;
  vendorId?: number;
  address?: string;
  department?: string;
}

export interface CreateStaffResponse {
  message: string;
  staff: Staff;
  vendor?: {
    id: number;
    companyName: string;
  };
}

export interface EditStaffRequest {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  skills?: string[];
  isTapovanNest?: boolean;
  vendorId?: number;
  address?: string;
  department?: string;
  active?: boolean;
}

export interface EditStaffResponse {
  message: string;
  staff: Staff;
}

export interface DeleteStaffResponse {
  message: string;
}

export interface GetVendorsResponse {
  vendors: Array<{
    id: number;
    companyName: string;
    name: string;
 
  }>;
}

export interface AllStaffResponse {
  staff: Staff[];
  total: number;
  page: number;
  pages: number;
}

export interface AllStaffQueryParams {
  search?: string;
  page?: number;
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}
