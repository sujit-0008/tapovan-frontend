import api from './api';
import { API_ROUTES } from '../constants/api';
import { VendorRegistrationCredentials, VendorRegistrationResponse } from '../types/registerVendor';

export const registerVendor = async (
  credentials: VendorRegistrationCredentials,
  files: {
    photo: File;
    formFileUrls?: File;
    kycBusinessReg?: File;
    kycTaxId?: File;
    kycAddressProof?: File;
  }
): Promise<VendorRegistrationResponse> => {
  const formData = new FormData();
  Object.entries(credentials).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  formData.append('photo', files.photo);
  if (files.formFileUrls) {
    formData.append('formFileUrls', files.formFileUrls);
  }
  if (files.kycBusinessReg) {
    formData.append('kycBusinessReg', files.kycBusinessReg);
  }
  if (files.kycTaxId) {
    formData.append('kycTaxId', files.kycTaxId);
  }
  if (files.kycAddressProof) {
    formData.append('kycAddressProof', files.kycAddressProof);
  }

  const response = await api.post<VendorRegistrationResponse>(
    API_ROUTES.VENDOR.REGISTER,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};