'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { useLeaves, useUpdateLeaveStatus } from '../../../hooks/useLeave';
import { getErrorMessage } from '../../../utils/errorUtils';

export default function LeaveManagement() {
  const [status, setStatus] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [page, setPage] = useState(1);

  const { data: leavesData, isLoading } = useLeaves(status, studentId, page);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateLeaveStatus();

  const handleStatusUpdate = (leaveId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    updateStatus(
      { id: leaveId, data: { status: newStatus } },
      {
        onSuccess: () => {
          alert(`Leave ${newStatus.toLowerCase()} successfully`);
        },
        onError: (error) => {
          const errorMessage = getErrorMessage(error);
          alert(`Failed to ${newStatus.toLowerCase()} leave: ${errorMessage}`);
        },
      }
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Leave Management</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-xl"
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading leave requests...</p>
          ) : !leavesData?.leaves?.length ? (
            <p className="text-sm text-gray-500">No leave requests found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-xl">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm">Student</th>
                    <th className="px-4 py-2 text-left text-sm">Start Date</th>
                    <th className="px-4 py-2 text-left text-sm">End Date</th>
                    <th className="px-4 py-2 text-left text-sm">Reason</th>
                    <th className="px-4 py-2 text-left text-sm">Status</th>
                    <th className="px-4 py-2 text-left text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leavesData.leaves.map((leave, index) => (
                    <tr key={leave.id} className={index % 2 ? 'bg-muted/20' : ''}>
                      <td className="px-4 py-2 text-sm">
                        {leave.student ? `${leave.student.firstName} ${leave.student.lastName || ''} (${leave.student.email})` : 'N/A'}
                      </td>
                      <td className="px-4 py-2 text-sm">{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-sm">{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-sm">{leave.reason}</td>
                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                            leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {leave.status === 'PENDING' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(leave.id.toString(), 'APPROVED')}
                              disabled={isUpdating}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusUpdate(leave.id.toString(), 'REJECTED')}
                              disabled={isUpdating}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {leavesData && leavesData.pagination.pages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                variant="outline"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {leavesData.pagination.pages}
              </span>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page === leavesData.pagination.pages}
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}