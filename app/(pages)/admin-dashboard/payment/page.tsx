'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { usePaymentStats } from '../../../hooks/usePaymentStats';
import { useStudents } from '../../../hooks/useAllStudents';
import { Search, Loader2, CreditCard, Users, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useDebounce } from '../../../hooks/useDebounce';

export default function PaymentManagement() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const { data: statsData, isLoading: statsLoading, error: statsError } = usePaymentStats();
  
  // Only fetch students if there is a search term
  const { data: studentsData, isLoading: studentsLoading } = useStudents({ 
    search: debouncedSearch, 
    page: 1,
    status: 'APPROVED' // Only show active students for payment search? Or all? User said "active year student" for stats, maybe search all.
                       // Let's stick to default which is usually PENDING but here we probably want APPROVED or all. 
                       // Let's not filter by status to find any student.
  });

  const getStats = () => {
    if (!statsData?.stats) return { total: 0, paid: 0, pending: 0 };
    return {
      total: statsData.stats.totalStudents,
      paid: statsData.stats.paidStudents,
      pending: statsData.stats.pendingStudents
    };
  };

  const { total, paid, pending } = getStats();

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Payment Management</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Active Students</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
               <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{total}</div>
            )}
            <p className="text-xs text-gray-500 mt-1">For currently active batch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Fees Paid (This Month)</CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
               <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold text-green-600">{paid}</div>
            )}
             <p className="text-xs text-gray-500 mt-1">{statsData?.month || 'Current Month'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Fees Pending (This Month)</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
             {statsLoading ? (
               <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold text-red-600">{pending}</div>
            )}
             <p className="text-xs text-gray-500 mt-1">{statsData?.month || 'Current Month'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Search Student Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
            />
          </div>

          {search && (
            <div className="space-y-4">
              {studentsLoading ? (
                 <div className="flex justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-hostel-gold" />
                 </div>
              ) : studentsData?.students?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentsData.students.map((student: any) => (
                    <div key={student.id} className="p-4 border rounded-xl flex justify-between items-center bg-white shadow-sm">
                      <div>
                        <p className="font-semibold text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          student.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                          student.status === 'SUSPENDED' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.status}
                        </span>
                      </div>
                      <Link
                        href={`/admin-dashboard/students/${student.id}/payment`}
                        className="px-4 py-2 rounded-lg bg-hostel-gold text-white text-sm hover:bg-hostel-gold/90 transition"
                      >
                        View Payment
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No students found.</p>
              )}
            </div>
          )}
           {!search && <p className="text-gray-400 text-sm">Start typing to search for a student.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
