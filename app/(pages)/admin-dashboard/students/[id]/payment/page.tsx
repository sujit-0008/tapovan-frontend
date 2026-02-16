
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { usePaymentHistory } from '../../../../../hooks/usePaymentHistory';
import { useCreatePayment } from '../../../../../hooks/useCreatePayment';
import { useUpdatePayment } from '../../../../../hooks/useUpdatePayment';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Payment } from '@/app/types/payment';

export default function StudentPayment() {
  const { id } = useParams<{ id: string }>();
  const [year, setYear] = useState<string>('');
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePaymentHistory(id, { year, page });

  const [createForm, setCreateForm] = useState({
    month: '',
    totalAnnualFees: '',
    totalRemainingFees: '',
    monthlyAmount: '',
    paidAmount: '',
    paid: false,
    paymentDate: '',
    remarks: '',
  });
  const [editPaymentId, setEditPaymentId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<{
    totalAnnualFees: string;
    totalRemainingFees: string;
    monthlyAmount: string;
    paidAmount: string;
    paid: boolean;
    paymentDate: string;
    remarks: string;
  }>>({});

  const { mutate: createPayment, isPending: isCreating } = useCreatePayment();
  const { mutate: updatePayment, isPending: isUpdating } = useUpdatePayment(id);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      studentId: id,
      month: createForm.month,
      totalAnnualFees: Number(createForm.totalAnnualFees),
      totalRemainingFees: Number(createForm.totalRemainingFees),
      monthlyAmount: Number(createForm.monthlyAmount),
      paidAmount: createForm.paidAmount ? Number(createForm.paidAmount) : undefined,
      paid: createForm.paid,
      paymentDate: createForm.paymentDate || undefined,
      remarks: createForm.remarks || undefined,
    };
    createPayment(data, {
      onSuccess: () => {
        setCreateForm({
          month: '',
          totalAnnualFees: '',
          totalRemainingFees: '',
          monthlyAmount: '',
          paidAmount: '',
          paid: false,
          paymentDate: '',
          remarks: '',
        });
      },
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPaymentId) return;
    const data = {
      totalAnnualFees: editForm.totalAnnualFees ? Number(editForm.totalAnnualFees) : undefined,
      totalRemainingFees: editForm.totalRemainingFees ? Number(editForm.totalRemainingFees) : undefined,
      monthlyAmount: editForm.monthlyAmount ? Number(editForm.monthlyAmount) : undefined,
      paidAmount: editForm.paidAmount ? Number(editForm.paidAmount) : undefined,
      paid: editForm.paid,
      paymentDate: editForm.paymentDate || null,
      remarks: editForm.remarks || null,
    };
    updatePayment({ id: editPaymentId, data }, {
      onSuccess: () => {
        setEditPaymentId(null);
        setEditForm({});
      },
    });
  };

  const handleEdit = (payment: Payment) => {
    setEditPaymentId(payment.id.toString());
    setEditForm({
      totalAnnualFees: payment.totalAnnualFees.toString(),
      totalRemainingFees: payment.totalRemainingFees.toString(),
      monthlyAmount: payment.monthlyAmount.toString(),
      paidAmount: payment.paidAmount.toString(),
      paid: payment.paid,
      paymentDate: payment.paymentDate ? new Date(payment.paymentDate).toISOString().split('T')[0] : '',
      remarks: payment.remarks || '',
    });
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (data && page < data.pages) setPage(page + 1);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Student Payments</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Payment</CardTitle>
          <p className="text-gray-500 text-sm sm:text-base">Add a new payment record for the student.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Month *</label>
              <input
                type="month"
                value={createForm.month}
                onChange={(e) => setCreateForm({ ...createForm, month: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isCreating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Annual Fees *</label>
              <input
                type="number"
                value={createForm.totalAnnualFees}
                onChange={(e) => setCreateForm({ ...createForm, totalAnnualFees: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isCreating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Remaining Fees *</label>
              <input
                type="number"
                value={createForm.totalRemainingFees}
                onChange={(e) => setCreateForm({ ...createForm, totalRemainingFees: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isCreating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Amount *</label>
              <input
                type="number"
                value={createForm.monthlyAmount}
                onChange={(e) => setCreateForm({ ...createForm, monthlyAmount: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isCreating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Paid Amount</label>
              <input
                type="number"
                value={createForm.paidAmount}
                onChange={(e) => setCreateForm({ ...createForm, paidAmount: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isCreating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Date</label>
              <input
                type="date"
                value={createForm.paymentDate}
                onChange={(e) => setCreateForm({ ...createForm, paymentDate: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isCreating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <input
                type="text"
                value={createForm.remarks}
                onChange={(e) => setCreateForm({ ...createForm, remarks: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isCreating}
              />
            </div>
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-2">Paid</label>
              <input
                type="checkbox"
                checked={createForm.paid}
                onChange={(e) => setCreateForm({ ...createForm, paid: e.target.checked })}
                className="h-5 w-5 text-hostel-gold focus:ring-hostel-gold"
                disabled={isCreating}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isCreating}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition disabled:opacity-50"
              >
                {isCreating ? 'Creating...' : 'Create Payment'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {editPaymentId && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Payment</CardTitle>
            <p className="text-gray-500 text-sm sm:text-base">Update the selected payment record.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Annual Fees</label>
                <input
                  type="number"
                  value={editForm.totalAnnualFees || ''}
                  onChange={(e) => setEditForm({ ...editForm, totalAnnualFees: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isUpdating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Remaining Fees</label>
                <input
                  type="number"
                  value={editForm.totalRemainingFees || ''}
                  onChange={(e) => setEditForm({ ...editForm, totalRemainingFees: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isUpdating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Amount</label>
                <input
                  type="number"
                  value={editForm.monthlyAmount || ''}
                  onChange={(e) => setEditForm({ ...editForm, monthlyAmount: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isUpdating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Paid Amount</label>
                <input
                  type="number"
                  value={editForm.paidAmount || ''}
                  onChange={(e) => setEditForm({ ...editForm, paidAmount: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isUpdating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                <input
                  type="date"
                  value={editForm.paymentDate || ''}
                  onChange={(e) => setEditForm({ ...editForm, paymentDate: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isUpdating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <input
                  type="text"
                  value={editForm.remarks || ''}
                  onChange={(e) => setEditForm({ ...editForm, remarks: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isUpdating}
                />
              </div>
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-2">Paid</label>
                <input
                  type="checkbox"
                  checked={editForm.paid || false}
                  onChange={(e) => setEditForm({ ...editForm, paid: e.target.checked })}
                  className="h-5 w-5 text-hostel-gold focus:ring-hostel-gold"
                  disabled={isUpdating}
                />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditPaymentId(null);
                    setEditForm({});
                  }}
                  disabled={isUpdating}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition disabled:opacity-50"
                >
                  {isUpdating ? 'Updating...' : 'Update Payment'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <p className="text-gray-500 text-sm sm:text-base">View all payment records for the student.</p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Filter by year (e.g., 2025)"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-muted/50 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-gray-500 text-sm">Loading payment history...</p>}
          {error && (
            <p className="text-red-500 text-sm">
              Error: {error.message || 'Failed to load payment history'}
            </p>
          )}
          {!isLoading && !error && data?.payments.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-6">No payments found.</p>
          )}
          {!isLoading && !error && data && data.payments && data.payments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm sm:text-base">
                    <th className="text-left py-3 px-2 sm:px-4">Month</th>
                    <th className="text-left py-3 px-2 sm:px-4">Total Annual Fees</th>
                    <th className="text-left py-3 px-2 sm:px-4">Remaining Fees</th>
                    <th className="text-left py-3 px-2 sm:px-4">Monthly Amount</th>
                    <th className="text-left py-3 px-2 sm:px-4">Paid Amount</th>
                    <th className="text-left py-3 px-2 sm:px-4">Paid</th>
                    <th className="text-left py-3 px-2 sm:px-4">Payment Date</th>
                    <th className="text-left py-3 px-2 sm:px-4">Remarks</th>
                    <th className="text-left py-3 px-2 sm:px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.payments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 sm:px-4 text-sm">
                        {new Date(payment.month).toLocaleString('en-US', { month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-2 sm:px-4 text-sm">{payment.totalAnnualFees}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm">{payment.totalRemainingFees}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm">{payment.monthlyAmount}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm">{payment.paidAmount}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm">{payment.paid ? 'Yes' : 'No'}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm">
                        {payment.paymentDate
                          ? new Date(payment.paymentDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                            })
                          : 'N/A'}
                      </td>
                      <td className="py-3 px-2 sm:px-4 text-sm truncate max-w-[150px] sm:max-w-[200px]">
                        {payment.remarks || 'N/A'}
                      </td>
                      <td className="py-3 px-2 sm:px-4">
                        <button
                          onClick={() => handleEdit(payment)}
                          disabled={isUpdating || isCreating}
                          className="text-sm text-hostel-gold hover:text-hostel-gold/80 font-medium"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      <div className="text-center mt-4">
        <Link
          href={`/admin/students/${id}`}
          className="text-hostel-gold hover:text-hostel-gold/80 text-sm font-medium"
        >
          Back to Student Profile
        </Link>
      </div>
    </div>
  );
}
