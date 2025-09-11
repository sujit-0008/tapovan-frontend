import { API_ROUTES } from '../constants/api';
import api from './api';
import { EditVendorRequest, EditVendorResponse } from '../types/editVendor';


export const editVendor = async (
  id: string,
  data: EditVendorRequest,
  files: { photo?: File; kycBusinessReg?: File; kycTaxId?: File; kycAddressProof?: File; formFileUrls?: File }
): Promise<EditVendorResponse> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  if (files.photo) formData.append('photo', files.photo);
  if (files.kycBusinessReg) formData.append('kycBusinessReg', files.kycBusinessReg);
  if (files.kycTaxId) formData.append('kycTaxId', files.kycTaxId);
  if (files.kycAddressProof) formData.append('kycAddressProof', files.kycAddressProof);
  if (files.formFileUrls) formData.append('formFileUrls', files.formFileUrls);
  const response = await api.put<EditVendorResponse>(API_ROUTES.VENDOR.EDIT.replace(':id', id), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};