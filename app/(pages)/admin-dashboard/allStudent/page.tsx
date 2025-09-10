
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { useStudents } from '../../../hooks/useAllStudents';
import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function AllStudents() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'SUSPENDED'>('PENDING');
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useStudents({ status, search, page });

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (data && page < data.pages) setPage(page + 1);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">All Students</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <p className="text-gray-500 text-sm sm:text-base">
            View and manage all registered students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by student name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
          {isLoading && <p className="text-gray-500 text-sm">Loading students...</p>}
          {error && (
            <p className="text-red-500 text-sm">
              Error: {error.message || 'Failed to load students'}
            </p>
          )}
          {!isLoading && !error && data?.students.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-6">No students found.</p>
          )}
          {!isLoading && !error && data?.students.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data?.students.map((student) => (
                <Card
                  key={student.id}
                  className="shadow-md hover:shadow-lg transition rounded-2xl"
                >
                  <CardContent className="p-4 sm:p-6 space-y-4 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden ring-2 ring-hostel-gold flex items-center justify-center bg-hostel-gold/10">
                      {student.photo ? (
                        <img
                          src={student.photo}
                          alt={`${student.name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-hostel-gold font-bold text-sm sm:text-base">
                          {`${student.name} || ''}`
                            .split(' ')
                            .map((n) => n[0])
                            .filter(Boolean)
                            .join('')}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{student.email}</p>
                    <p className="text-sm text-gray-500">
                      Status: <span className="font-medium">{student.status}</span>
                    </p>
                    <Link
                      href={`/admin-dashboard/students/${student.id}`}
                      className="block w-full rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white py-2 font-medium transition text-sm sm:text-base"
                    >
                      View Profile
                    </Link>
                      <Link
                      href={`/admin-dashboard/students/${student.id}/payment`}
                      className="block w-full rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white py-2 font-medium transition text-sm sm:text-base"
                    >
                      View Payments
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
