
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';

import { Accordion } from '../../../../components/ui/accordion';
import { useVendorDetails } from '../../../../hooks/useVendorDetails';
import { useEditVendor } from '../../../../hooks/useEditVendor';
import { EditVendorRequest } from '../../../../types/editVendor';
import { useApproveVendor } from '../../../../hooks/useApproveVendor';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function VendorDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useVendorDetails(id);
    const { mutate: approveVendor, isPending: isApproving } = useApproveVendor();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const { mutate: editVendor, isPending: isEditing } = useEditVendor(id);
    const handleApprove = () => {
    approveVendor({ id, data: { status: 'APPROVED' } });}
    
  const handleSuspend = () => {
    if (!rejectionReason.trim()) {
      alert('Rejection reason is required for suspension');
          return;
    }
    approveVendor({ id, data: { status: 'SUSPENDED', rejectionReason } });
  };


  const [isEditingMode, setIsEditingMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
    name: '',
    password: '',
    category: '',
    gstNumber: '',
    numberOfEmployees: 0,
    companyName: '',
    address: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
  });
  const [files, setFiles] = useState<{
    photo?: File;
    kycBusinessReg?: File;
    kycTaxId?: File;
    kycAddressProof?: File;
    formFileUrls?: File;
  }>({});

  // Pre-fill form on load
  useEffect(() => {
    if (data?.vendor) {
      const { vendor } = data;
      setFormData({
        email: vendor.email || '',
        mobileNumber: vendor.mobileNumber || '',
        whatsappNumber: vendor.whatsappNumber || '',
        name: vendor.name || '',
        password: '',
        category: vendor.category || '',
        gstNumber: vendor.gstNumber || '',
        numberOfEmployees: vendor.numberOfEmployees || 0,
        companyName: vendor.companyName || '',
        address: vendor.address || '',
        companyAddress: vendor.companyAddress || '',
        companyPhone: vendor.companyPhone || '',
        companyEmail: vendor.companyEmail || '',
      });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: EditVendorRequest = {
      ...formData,
      password: formData.password || undefined,
      numberOfEmployees: formData.numberOfEmployees || undefined,
    };
    editVendor({ data, files }, {
      onSuccess: () => {
        setIsEditingMode(false);
        setFiles({});
      },
    });
  };

  const handleFileChange = (key: 'photo' | 'kycBusinessReg' | 'kycTaxId' | 'kycAddressProof' | 'formFileUrls') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (key === 'formFileUrls' && file.type !== 'application/pdf') {
        alert('Only PDF files are allowed for formFileUrls');
        return;
      }
      if (['photo', 'kycBusinessReg', 'kycTaxId', 'kycAddressProof'].includes(key) && !file.type.startsWith('image/')) {
        alert('Only image files are allowed');
        return;
      }
      if (file.size > (key === 'formFileUrls' ? 2 * 1024 * 1024 : 200 * 1024)) {
        alert(`File size must be less than ${key === 'formFileUrls' ? '2MB' : '200KB'}`);
        return;
      }
      setFiles((prev) => ({ ...prev, [key]: file }));
    }
  };

  if (isLoading) return <p className="p-4 sm:p-6 text-gray-500 text-sm">Loading vendor details...</p>;
  if (error) return <p className="p-4 sm:p-6 text-red-500 text-sm">Error: {error.message || 'Failed to load vendor'}</p>;
  if (!data?.vendor) return <p className="p-4 sm:p-6 text-gray-500 text-sm">Vendor not found</p>;

  const { vendor } = data;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {vendor.name} Details
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditingMode(!isEditingMode)}
            className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition text-sm sm:text-base"
          >
            {isEditingMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {isEditingMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Vendor Profile</CardTitle>
            <p className="text-gray-500 text-sm sm:text-base">
              Update vendor details. Changes will be set to PENDING for review.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Accordion title="Personal Information" defaultOpen>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                </div>
              </Accordion>
              <Accordion title="Company Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">GST Number</label>
                    <input
                      type="text"
                      value={formData.gstNumber}
                      onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Employees</label>
                    <input
                      type="number"
                      value={formData.numberOfEmployees}
                      onChange={(e) => setFormData({ ...formData, numberOfEmployees: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Address</label>
                    <input
                      type="text"
                      value={formData.companyAddress}
                      onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Phone</label>
                    <input
                      type="tel"
                      value={formData.companyPhone}
                      onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Email</label>
                    <input
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                </div>
              </Accordion>
              <Accordion title="Documents">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo (max 200KB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange('photo')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hostel-gold/10 file:text-hostel-gold hover:file:bg-hostel-gold/20"
                      disabled={isEditing}
                    />
                    {vendor.photo && (
                      <p className="text-sm text-gray-500 mt-1">Current: <a href={vendor.photo} target="_blank" className="text-hostel-gold">View</a></p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">KYC Business Registration (max 200KB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange('kycBusinessReg')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hostel-gold/10 file:text-hostel-gold hover:file:bg-hostel-gold/20"
                      disabled={isEditing}
                    />
                    {vendor.kycBusinessReg && (
                      <p className="text-sm text-gray-500 mt-1">Current: <a href={vendor.kycBusinessReg} target="_blank" className="text-hostel-gold">View</a></p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">KYC Tax ID (max 200KB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange('kycTaxId')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hostel-gold/10 file:text-hostel-gold hover:file:bg-hostel-gold/20"
                      disabled={isEditing}
                    />
                    {vendor.kycTaxId && (
                      <p className="text-sm text-gray-500 mt-1">Current: <a href={vendor.kycTaxId} target="_blank" className="text-hostel-gold">View</a></p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">KYC Address Proof (max 200KB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange('kycAddressProof')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hostel-gold/10 file:text-hostel-gold hover:file:bg-hostel-gold/20"
                      disabled={isEditing}
                    />
                    {vendor.kycAddressProof && (
                      <p className="text-sm text-gray-500 mt-1">Current: <a href={vendor.kycAddressProof} target="_blank" className="text-hostel-gold">View</a></p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Form File URLs (PDF, max 2MB)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange('formFileUrls')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hostel-gold/10 file:text-hostel-gold hover:file:bg-hostel-gold/20"
                      disabled={isEditing}
                    />
                    {vendor.formFileUrls && (
                      <p className="text-sm text-gray-500 mt-1">Current: <a href={vendor.formFileUrls} target="_blank" className="text-hostel-gold">View</a></p>
                    )}
                  </div>
                </div>
              </Accordion>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingMode(false);
                    setFiles({});
                  }}
                  disabled={isEditing}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition disabled:opacity-50 text-sm sm:text-base"
                >
                  {isEditing ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-sm text-gray-500">{vendor.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-500">{vendor.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Mobile Number</p>
                  <p className="text-sm text-gray-500">{vendor.mobileNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">WhatsApp Number</p>
                  <p className="text-sm text-gray-500">{vendor.whatsappNumber || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Company Name</p>
                  <p className="text-sm text-gray-500">{vendor.companyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Category</p>
                  <p className="text-sm text-gray-500">{vendor.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">GST Number</p>
                  <p className="text-sm text-gray-500">{vendor.gstNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Number of Employees</p>
                  <p className="text-sm text-gray-500">{vendor.numberOfEmployees}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-sm text-gray-500">{vendor.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Company Address</p>
                  <p className="text-sm text-gray-500">{vendor.companyAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Company Phone</p>
                  <p className="text-sm text-gray-500">{vendor.companyPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Company Email</p>
                  <p className="text-sm text-gray-500">{vendor.companyEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Photo</p>
                  <p className="text-sm text-gray-500">
                    {vendor.photo ? <a href={vendor.photo} target="_blank" className="text-hostel-gold">View</a> : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">KYC Business Registration</p>
                  <p className="text-sm text-gray-500">
                    {vendor.kycBusinessReg ? <a href={vendor.kycBusinessReg} target="_blank" className="text-hostel-gold">View</a> : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">KYC Tax ID</p>
                  <p className="text-sm text-gray-500">
                    {vendor.kycTaxId ? <a href={vendor.kycTaxId} target="_blank" className="text-hostel-gold">View</a> : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">KYC Address Proof</p>
                  <p className="text-sm text-gray-500">
                    {vendor.kycAddressProof ? <a href={vendor.kycAddressProof} target="_blank" className="text-hostel-gold">View</a> : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Form File URLs</p>
                  <p className="text-sm text-gray-500">
                    {vendor.formFileUrls ? <a href={vendor.formFileUrls} target="_blank" className="text-hostel-gold">View</a> : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

    
      
      <div className="text-center mt-4">
        <Link href="/foodVendorDashboard" className="text-hostel-gold hover:text-hostel-gold/80 text-sm font-medium">
          Back to Vendors
        </Link>
      </div>
    </div>
  );
}
