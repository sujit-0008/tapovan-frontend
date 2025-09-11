import { Vendor } from './vendor';

export interface EditVendorRequest {
  email?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
  name?: string;
  password?: string;
  category?: string;
  gstNumber?: string;
  numberOfEmployees?: number;
  companyName?: string;
  address?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

export interface EditVendorResponse {
  message: string;
  vendor: Vendor;
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}