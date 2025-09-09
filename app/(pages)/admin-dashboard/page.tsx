'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useNotifications } from '../../hooks/useAdminNotifications';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminNotifications() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'PENDING' | 'RESOLVED'>('PENDING');
  const { data, isLoading, error } = useNotifications({ status, search });

  const getTypeStyle = (action: string) => {
    switch (action) {
      case 'STUDENT_REGISTRATION':
        return 'bg-yellow-100 text-yellow-700 border border-gray-300';
      case 'VENDOR_REGISTRATION':
        return 'bg-blue-100 text-blue-700 border border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  };

  const formatMessage = (notification: any) => {
    if (notification.action === 'STUDENT_REGISTRATION' && notification.student) {
      return `Student: ${notification.student.firstName} ${notification.student.lastName || ''} - New registration`;
    }
    if (notification.action === 'VENDOR_REGISTRATION' && notification.vendor) {
      return `Vendor: ${notification.vendor.name} - New registration`;
    }
    return notification.details;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Notifications</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage and view all notifications for student and vendor registrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-xs rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'PENDING' | 'RESOLVED')}
              className="w-full sm:max-w-xs rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
            >
              <option value="PENDING">Pending</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-gray-500 text-sm">Loading notifications...</p>}
          {error && (
            <p className="text-red-500 text-sm">Error: {error.message || 'Failed to load notifications'}</p>
          )}
          {!isLoading && !error && data?.notifications.length === 0 && (
            <p className="text-gray-500 text-sm">No notifications found.</p>
          )}
          {!isLoading && !error && data?.notifications.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm sm:text-base">Type</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm sm:text-base">Message</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm sm:text-base">Date</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm sm:text-base">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.notifications.map((notification) => (
                    <tr key={notification.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 sm:px-4">
                        <span
                          className={`inline-block text-xs font-medium px-2 py-1 rounded-md ${getTypeStyle(notification.action)}`}
                        >
                          {notification.action === 'STUDENT_REGISTRATION' ? 'Student' : 'Vendor'}
                        </span>
                      </td>
                      <td className="py-3 px-2 sm:px-4 max-w-[200px] sm:max-w-md truncate">
                        <p className="text-sm">{formatMessage(notification)}</p>
                      </td>
                      <td className="py-3 px-2 sm:px-4 text-sm text-gray-500">
                        {formatDate(notification.timestamp)}
                      </td>
                      <td className="py-3 px-2 sm:px-4">
                        {!notification.resolved && notification.action === 'STUDENT_REGISTRATION' && (
                          <Link
                            href={`/admin-dashboard/students/${notification.studentId}`}
                            className="inline-block text-xs font-medium px-2 py-1 rounded-md bg-green-100 text-green-700 border border-blue-300"
                          >
                            Open
                          </Link>
                        )}
                        {!notification.resolved && notification.action === 'VENDOR_REGISTRATION' && (
                          <Link
                            href={`/admin-dashboard/vendors/${notification.vendorId}`}
                            className="inline-block text-xs font-medium px-2 py-1 rounded-md bg-green-100 text-green-700 border border-blue-300"
                          >
                            Open
                          </Link>
                        )}
                        {notification.resolved && (
                          <span className="inline-block text-xs font-medium px-2 py-1 rounded-md border border-gray-400 text-gray-600">
                            Resolved
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}