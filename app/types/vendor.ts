

export interface Vendor {
  id: string;
  email: string;
  mobileNumber: string;
  whatsappNumber?: string;
  name: string;
  password?: string;
  photo: string;
  category: string;
  status: 'PENDING' | 'APPROVED' | 'SUSPENDED';
  companyName?: string;
  address?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  formFileUrls?: string | null;
  kycBusinessReg?: string | null;
  kycTaxId?: string | null;
  kycAddressProof?: string | null;
  gstNumber?: string;
  numberOfEmployees?: number;
  createdById?: string;
  rejectionReason?: string | null;
}



export interface VendorDetailsResponse {
  vendor: Vendor;
}

export interface ApproveVendorRequest {
  status: 'APPROVED' | 'SUSPENDED';
  rejectionReason?: string;
}

export interface ApproveVendorResponse {
  message: string;
  vendor: Vendor;
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}