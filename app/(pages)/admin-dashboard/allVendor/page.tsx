
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { useVendors } from '../../../hooks/useAllVendors';
import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function AllVendors() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'SUSPENDED'>('PENDING');
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useVendors({ status, search, page });

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (data && page < data.pages) setPage(page + 1);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">


      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
          <p className="text-gray-500 text-sm sm:text-base">
            View and manage all registered vendors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by vendor name or email"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
              />
            </div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as 'PENDING' | 'APPROVED' | 'SUSPENDED');
                setPage(1);
              }}
              className="w-full sm:max-w-xs rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-gray-500 text-sm">Loading vendors...</p>}
          {error && (
            <p className="text-red-500 text-sm">
              Error: {error.message || 'Failed to load vendors'}
            </p>
          )}
          {!isLoading && !error && data?.vendors.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-6">No vendors found.</p>
          )}
          {!isLoading && !error && data?.vendors && data.vendors.length > 0 && (
            <div className="flex flex-col sm:grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data?.vendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className="shadow-md hover:shadow-lg transition rounded-2xl"
                >
                  <CardContent className="p-4 sm:p-6 space-y-4 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden ring-2 ring-hostel-gold flex items-center justify-center bg-hostel-gold/10">
                      {vendor.photo ? (
                        <Image
                          src={vendor.photo}
                          alt={vendor.name}
                          width={16}
                          height={16}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-hostel-gold font-bold text-sm sm:text-base">
                          {vendor.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      {vendor.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{vendor.email}</p>
                    <p className="text-sm text-gray-500">
                      Status: <span className="font-medium">{vendor.status}</span>
                    </p>
                    <Link
                      href={`/admin-dashboard/vendors/${vendor.id}`}
                      className="block w-full rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white py-2 font-medium transition text-sm sm:text-base"
                    >
                      View Profile
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {data && data.pages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className="px-3 sm:px-4 py-2 rounded-xl bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition text-sm sm:text-base"
              >
                Previous
              </button>
              <span className="text-sm sm:text-base">
                Page {data.page} of {data.pages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === data.pages}
                className="px-3 sm:px-4 py-2 rounded-xl bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition text-sm sm:text-base"
              >
                Next
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
