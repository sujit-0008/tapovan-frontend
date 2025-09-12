'use client';

import { Card, CardContent } from '../../components/ui/card';
import { useState } from 'react';
import { useRegisterVendor } from '../../hooks/useRegisterVendor';
import Link from 'next/link';

export default function VendorRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
    name: '',
    password: '',
    category: '',
    gstNumber: '',
    numberOfEmployees: '',
    companyName: '',
    address: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
  });
  const [files, setFiles] = useState<{
    photo: File | null;
    formFileUrls: File | null;
    kycBusinessReg: File | null;
    kycTaxId: File | null;
    kycAddressProof: File | null;
  }>({
    photo: null,
    formFileUrls: null,
    kycBusinessReg: null,
    kycTaxId: null,
    kycAddressProof: null,
  });
  const { mutate: register, isPending, error } = useRegisterVendor();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.email || !formData.mobileNumber || !formData.name || !formData.category || !files.photo) {
      alert('Please fill in all required fields: email, mobileNumber, name, category, and photo');
      return;
    }
    if (!files.photo) return;
    register({
      credentials: formData,
      files: {
        photo: files.photo,
        formFileUrls: files.formFileUrls || undefined,
        kycBusinessReg: files.kycBusinessReg || undefined,
        kycTaxId: files.kycTaxId || undefined,
        kycAddressProof: files.kycAddressProof || undefined,
      }
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-hostel-gold to-hostel-burgundy p-8 rounded-lg text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Vendor Registration</h1>
        </div>

        <Card>
          <CardContent className="p-8">
            {error && (
              <div className="text-red-500 text-sm mb-4">
                {(error as any).response?.data?.error || 'An error occurred during registration'}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name *
                  </label>
                  <input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  >
                    <option value="">Select Category</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="food-vendor">Food Vendor</option>
                    <option value="laundry">Laundry Service</option>
                    <option value="medical">Medical Staff</option>
                  </select>
                </div>
              </div>

              {/* Email + Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="mobileNumber" className="block text-sm font-medium">
                    Mobile Number *
                  </label>
                  <input
                    id="mobileNumber"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="whatsappNumber" className="block text-sm font-medium">
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsappNumber"
                    placeholder="Enter WhatsApp Number"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="numberOfEmployees" className="block text-sm font-medium">
                    Number of Employees
                  </label>
                  <input
                    id="numberOfEmployees"
                    type="number"
                    placeholder="Enter Number of Employees"
                    value={formData.numberOfEmployees}
                    onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="gstNumber" className="block text-sm font-medium">
                    GST Number
                  </label>
                  <input
                    id="gstNumber"
                    placeholder="Enter GST Number"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="companyName" className="block text-sm font-medium">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    placeholder="Enter Company Name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium">
                    Address
                  </label>
                  <input
                    id="address"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="companyAddress" className="block text-sm font-medium">
                    Company Address
                  </label>
                  <input
                    id="companyAddress"
                    placeholder="Enter Company Address"
                    value={formData.companyAddress}
                    onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="companyPhone" className="block text-sm font-medium">
                    Company Phone
                  </label>
                  <input
                    id="companyPhone"
                    placeholder="Enter Company Phone"
                    value={formData.companyPhone}
                    onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="companyEmail" className="block text-sm font-medium">
                    Company Email
                  </label>
                  <input
                    id="companyEmail"
                    type="email"
                    placeholder="Enter Company Email"
                    value={formData.companyEmail}
                    onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* File Uploads: Photo (required) */}
              <div className="space-y-2">
                <label htmlFor="photo" className="block text-sm font-medium">
                  Photo (JPEG/PNG, max 200KB) *
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/jpeg,image/png"
                  className="w-full cursor-pointer rounded-md border border-input bg-muted/50 file:bg-hostel-gold file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                  onChange={(e) => handleFileChange('photo', e.target.files?.[0] || null)}
                  disabled={isPending}
                />
              </div>

              {/* File Uploads: Form File and KYC (optional) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="formFileUrls" className="block text-sm font-medium">
                    Form File (PDF, max 2MB)
                  </label>
                  <input
                    id="formFileUrls"
                    type="file"
                    accept="application/pdf"
                    className="w-full cursor-pointer rounded-md border border-input bg-muted/50 file:bg-hostel-gold file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                    onChange={(e) => handleFileChange('formFileUrls', e.target.files?.[0] || null)}
                    disabled={isPending}
                  />
                </div>
                {['kycBusinessReg', 'kycTaxId', 'kycAddressProof'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label htmlFor={field} className="block text-sm font-medium">
                      {field.replace(/([A-Z])/g, ' $1').trim()} (Image/PDF)
                    </label>
                    <input
                      id={field}
                      type="file"
                      accept="image/*,application/pdf"
                      className="w-full cursor-pointer rounded-md border border-input bg-muted/50 file:bg-hostel-gold file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                      onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
                      disabled={isPending}
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-md bg-hostel-gold px-8 py-2 font-medium text-white hover:bg-hostel-gold/90 transition disabled:opacity-50"
                >
                  {isPending ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-center mt-4">
          <Link
            href="/login"
            className="text-hostel-gold hover:text-hostel-gold/80 text-sm font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}