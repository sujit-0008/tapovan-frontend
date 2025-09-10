
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { useVendorDetails } from '../../../../hooks/useVendorDetails';
import { useApproveVendor } from '../../../../hooks/useApproveVendor';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function VendorDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useVendorDetails(id);
  const { mutate: approveVendor, isPending: isApproving } = useApproveVendor();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);

  const handleApprove = () => {
    approveVendor({ id, data: { status: 'APPROVED' } });
  };

  const handleSuspend = () => {
    if (!rejectionReason.trim()) {
      alert('Rejection reason is required for suspension');
      return;
    }
    approveVendor({ id, data: { status: 'SUSPENDED', rejectionReason } });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Vendor Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-gray-500 text-sm">Loading vendor details...</p>}
          {error && (
            <p className="text-red-500 text-sm">
              Error: {error.message || 'Failed to load vendor details'}
            </p>
          )}
          {data?.vendor && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Personal Details</h3>
                <p className="text-sm">
                  <strong>Name:</strong> {data.vendor.name}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {data.vendor.email}
                </p>
                <p className="text-sm">
                  <strong>Mobile:</strong> {data.vendor.mobileNumber}
                </p>
                <p className="text-sm">
                  <strong>WhatsApp:</strong> {data.vendor.whatsappNumber || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Address:</strong> {data.vendor.address || 'N/A'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Company Details</h3>
                <p className="text-sm">
                  <strong>Company Name:</strong> {data.vendor.companyName || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Company Email:</strong> {data.vendor.companyEmail || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Company Phone:</strong> {data.vendor.companyPhone || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Company Address:</strong> {data.vendor.companyAddress || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>GST Number:</strong> {data.vendor.gstNumber || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Number of Employees:</strong> {data.vendor.numberOfEmployees || 'N/A'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Vendor Details</h3>
                <p className="text-sm">
                  <strong>Category:</strong> {data.vendor.category}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> {data.vendor.status}
                </p>
                {data.vendor.rejectionReason && (
                  <p className="text-sm">
                    <strong>Rejection Reason:</strong> {data.vendor.rejectionReason}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Documents</h3>
                <div className="text-sm">
                  <strong>Photo:</strong>
                  <a href={data.vendor.photo} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={data.vendor.photo}
                      alt="Vendor Photo"
                      width={128}
                      height={128}
                      className="mt-2 object-cover rounded-md border cursor-pointer"
                    />
                  </a>
                </div>
                {data.vendor.formFileUrls && (
                  <div className="text-sm">
                    <strong>Form File:</strong>{' '}
                    <a
                      href={data.vendor.formFileUrls}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View PDF
                    </a>
                  </div>
                )}
                {data.vendor.kycBusinessReg && (
                  <div className="text-sm">
                    <strong>KYC Business Registration:</strong>
                    <a href={data.vendor.kycBusinessReg} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={data.vendor.kycBusinessReg}
                        alt="KYC Business Registration"
                        width={192}
                        height={128}
                        className="mt-2 object-contain rounded-md border cursor-pointer"
                      />
                    </a>
                  </div>
                )}
                {data.vendor.kycTaxId && (
                  <div className="text-sm">
                    <strong>KYC Tax ID:</strong>
                    <a href={data.vendor.kycTaxId} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={data.vendor.kycTaxId}
                        alt="KYC Tax ID"
                        width={192}
                        height={128}
                        className="mt-2 object-contain rounded-md border cursor-pointer"
                      />
                    </a>
                  </div>
                )}
                {data.vendor.kycAddressProof && (
                  <div className="text-sm">
                    <strong>KYC Address Proof:</strong>
                    <a href={data.vendor.kycAddressProof} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={data.vendor.kycAddressProof}
                        alt="KYC Address Proof"
                        width={192}
                        height={128}
                        className="mt-2 object-contain rounded-md border cursor-pointer"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {data?.vendor && data.vendor.status === 'PENDING' && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-sm sm:text-base">Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleApprove}   
                  disabled={isApproving}
                  className="rounded-md bg-hostel-gold px-4 sm:px-6 py-2 font-medium text-white hover:bg-hostel-gold/90 transition disabled:opacity-50"
                >
                  {isApproving ? 'Processing...' : 'Approve'}
                </button>
                </div>
              </div>
            )
            
        
            }
          {data?.vendor  && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-sm sm:text-base">Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="rounded-md bg-hostel-gold px-4 sm:px-6 py-2 font-medium text-white hover:bg-hostel-gold/90 transition disabled:opacity-50"
                >
                  {isApproving ? 'Processing...' : 'Approve'}
                </button> */}
                <button
                  onClick={() => setShowRejectionInput(true)}
                  disabled={isApproving || showRejectionInput}
                  className="rounded-md bg-red-500 px-4 sm:px-6 py-2 font-medium text-white hover:bg-red-600 transition disabled:opacity-50"
                >
                  Suspend
                </button>
              </div>
              {showRejectionInput && (
                <div className="space-y-2">
                  <label htmlFor="rejectionReason" className="block text-sm font-medium">
                    Rejection Reason *
                  </label>
                  <textarea
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for suspension"
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    rows={4}
                    disabled={isApproving}
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowRejectionInput(false)}
                      disabled={isApproving}
                      className="rounded-md bg-gray-300 px-4 sm:px-6 py-2 font-medium text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSuspend}
                      disabled={isApproving}
                      className="rounded-md bg-red-500 px-4 sm:px-6 py-2 font-medium text-white hover:bg-red-600 transition disabled:opacity-50"
                    >
                      {isApproving ? 'Processing...' : 'Confirm Suspension'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}


        </CardContent>
      </Card>
      <div className="text-center mt-4">
        <Link
          href="/admin/notifications"
          className="text-hostel-gold hover:text-hostel-gold/80 text-sm font-medium"
        >
          Back to Notifications
        </Link>
      </div>
    </div>
  );
}
