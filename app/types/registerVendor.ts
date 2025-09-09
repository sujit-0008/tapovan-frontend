export interface VendorRegistrationCredentials {
  email: string;
  mobileNumber: string;
  whatsappNumber?: string;
  name: string;
  password?: string;
  category: string;
  gstNumber?: string;
  numberOfEmployees?: number;
  companyName?: string;
  address?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

export interface Vendor {
  id: string;
  email: string;
  name: string;
  category: string;
  status: string;
  companyName?: string;
  address?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  gstNumber?: string;
  numberOfEmployees?: number;
}

export interface VendorRegistrationResponse {
  message: string;
  vendor: Vendor;
}

export interface ErrorResponse {
  error: string;
}