'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import {
  useTickets,
  useUpdateTicketStatus,
  useStaffBySkills,
  useSkillsForCategory,
  useReassignTicketBySkills,
} from '../../../hooks/useTickets';
import { ChevronDown, Wrench } from 'lucide-react';
import { TicketStatus, Ticket } from '../../../types/ticket';
import { Search, UserCheck, Clock, CheckCircle, RefreshCw } from 'lucide-react';

export default function TicketManagement() {
  const [statusFilter, setStatusFilter] = useState<'PENDING' | 'IN_PROGRESS' | 'CLOSED'>('PENDING');
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [closingNote, setClosingNote] = useState('');
  const [searchSkills, setSearchSkills] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [reassignReason, setReassignReason] = useState('');
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);

  const { data, isLoading } = useTickets(statusFilter, page);
  const { data: skillsData } = useSkillsForCategory();
  const { data: staffData } = useStaffBySkills(searchSkills);
  const statusMutation = useUpdateTicketStatus();
  const reassignMutation = useReassignTicketBySkills();

  const skillMapping = skillsData?.skillMapping || {};

  const stats = {
    PENDING: data?.tickets.filter(t => t.status === 'PENDING').length || 0,
    IN_PROGRESS: data?.tickets.filter(t => t.status === 'IN_PROGRESS').length || 0,
    CLOSED: data?.tickets.filter(t => t.status === 'CLOSED').length || 0,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'CLOSED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssign = (ticket: Ticket): void => {
    setSelectedTicket(ticket);
    const suggested = skillMapping[ticket.category] || [];
    setSearchSkills(suggested.join(','));
    setShowAssignModal(true);
  };

  const handleStatusChange = (ticket: Ticket): void => {
    setSelectedTicket(ticket);
    setClosingNote('');
    setShowStatusModal(true);
  };

  const handleReassign = (ticket: Ticket): void => {
    setSelectedTicket(ticket);
    const suggested = skillMapping[ticket.category] || [];
    setSearchSkills(suggested.join(','));
    setReassignReason('');
    setSelectedStaffId('');
    setShowReassignModal(true);
  };

  const confirmAssign = () => {
    if (!selectedTicket || !selectedStaffId) return;
    statusMutation.mutate(
      {
        id: selectedTicket.id.toString(),
        status: 'IN_PROGRESS',
        assignedToAdminId: parseInt(selectedStaffId),
      },
      {
        onSuccess: () => {
          setShowAssignModal(false);
          setSelectedStaffId('');
        },
      }
    );
  };

  const confirmStatus = (newStatus: 'IN_PROGRESS' | 'CLOSED') => {
    if (!selectedTicket) return;
    if (newStatus === 'CLOSED' && !closingNote.trim()) {
      alert('Please add a closing note.');
      return;
    }
    statusMutation.mutate(
      { id: selectedTicket.id.toString(), status: newStatus, note: newStatus === 'CLOSED' ? closingNote : undefined },
      {
        onSuccess: () => {
          setShowStatusModal(false);
          setSelectedTicket(null);
          setClosingNote('');
        },
      }
    );
  };

  const confirmReassign = () => {
    if (!selectedTicket || !selectedStaffId) return;
    reassignMutation.mutate(
      {
        ticketId: selectedTicket.id.toString(),
        staffId: parseInt(selectedStaffId),
        reason: reassignReason,
      },
      {
        onSuccess: () => {
          setShowReassignModal(false);
          setSelectedTicket(null);
          setReassignReason('');
          setSelectedStaffId('');
        },
      }
    );
  };

  const handleCloseTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setClosingNote('');
    setShowStatusModal(true);
  };

  const handleReopen = (ticket: Ticket) => {
    statusMutation.mutate(
      { id: ticket.id.toString(), status: 'PENDING' },
      {
        onSuccess: () => {
          setSelectedTicket(null);
        },
      }
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold">{stats.PENDING}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Wrench className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold">{stats.IN_PROGRESS}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Closed</p>
              <p className="text-2xl font-bold">{stats.CLOSED}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="relative w-48">
              <button
                onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
              >
                <span>{statusFilter}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {openStatusDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {['PENDING', 'IN_PROGRESS', 'CLOSED'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status as TicketStatus);
                        setPage(1);
                        setOpenStatusDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Student</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Assigned To</th>
                    <th className="text-left py-3 px-4">Closure Note</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{ticket.id}</td>
                      <td className="py-3 px-4 text-sm">
                        {ticket.raisedBy.firstName} {ticket.raisedBy.lastName}
                      </td>
                      <td className="py-3 px-4 text-sm">{ticket.category}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {ticket.assignedToAdminId
                          ? `Staff : ${ticket.assignedToAdmin
                            ? ticket.assignedToAdmin.name
                            : 'Unassigned'
                        }`
                          : 'Unassigned'}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {ticket.closureNote ? ticket.closureNote : 'N/A'}
                        </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2 flex-wrap">
                          {ticket.status === 'PENDING' && (
                            <Button onClick={() => handleAssign(ticket)}>
                              <UserCheck className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                          )}
                          {(ticket.status === 'PENDING' ||
                            ticket.status === 'IN_PROGRESS') && (
                            <Button
                              variant="outline"
                              onClick={() => handleStatusChange(ticket)}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              Update
                            </Button>
                          )}
                          {ticket.status === 'IN_PROGRESS' && (
                            <>
                              <Button
                                className="bg-green-500 text-white hover:bg-green-600"
                                onClick={() => handleCloseTicket(ticket)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Close
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleReassign(ticket)}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Reassign
                              </Button>
                            </>
                          )}
                          {ticket.status === 'CLOSED' && (
                            <Button variant="outline" onClick={() => handleReopen(ticket)}>
                              Reopen
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </Button>
              <span className="py-2">
                Page {data.page} of {data.pages}
              </span>
              <Button
                variant="outline"
                disabled={page === data.pages}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assign Modal */}
      {showAssignModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>Assign Ticket #{selectedTicket.id}</CardTitle>
              <p className="text-sm text-gray-500">
                Category: {selectedTicket.category}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Search Staff by Skills
                </label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g., plumbing, electrical"
                    value={searchSkills}
                    onChange={(e) => setSearchSkills(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto border rounded-lg">
                {staffData?.staff.length ? (
                  staffData.staff.map((staff) => (
                    <div
                      key={staff.id}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedStaffId === staff.id.toString()
                          ? 'bg-hostel-gold/10'
                          : ''
                      }`}
                      onClick={() => setSelectedStaffId(staff.id.toString())}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-sm text-gray-500">
                            {staff.skills.join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            Active tickets
                          </p>
                          <p className="font-medium">{staff.activeTickets}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-gray-500">
                    No staff found
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmAssign}
                  disabled={!selectedStaffId || statusMutation.isPending}
                >
                  {statusMutation.isPending ? 'Assigning...' : 'Assign Ticket'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedTicket && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>Ticket #{selectedTicket.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Current status:{' '}
                <strong>{selectedTicket.status.replace('_', ' ')}</strong>
              </p>
              {selectedTicket.status === 'IN_PROGRESS' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Closing Note *</label>
                  <Input
                    value={closingNote}
                    onChange={(e) => setClosingNote(e.target.value)}
                    placeholder="Add a note before closing"
                  />
                </div>
              )}
              <div className="flex flex-col gap-3">
                {selectedTicket.status === 'PENDING' && (
                  <Button onClick={() => confirmStatus('IN_PROGRESS')}>
                    Mark as In Progress
                  </Button>
                )}

                {selectedTicket.status === 'IN_PROGRESS' && (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => confirmStatus('CLOSED')}
                  >
                    Mark as Closed
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    setShowStatusModal(false);
                    setClosingNote('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reassign Modal */}
      {showReassignModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>Reassign Ticket #{selectedTicket.id}</CardTitle>
              <p className="text-sm text-gray-500">
                Category: {selectedTicket.category}
              </p>
              <p className="text-sm text-gray-500">
                Currently assigned to: {selectedTicket.assignedToAdmin?.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reason for Reassignment (Optional)
                </label>
                <Input
                  placeholder="e.g., Skills mismatch, Better expertise needed"
                  value={reassignReason}
                  onChange={(e) => setReassignReason(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Search Staff by Skills
                </label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g., plumbing, electrical"
                    value={searchSkills}
                    onChange={(e) => setSearchSkills(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto border rounded-lg">
                {staffData?.staff.length ? (
                  staffData.staff
                    .filter(staff => staff.id !== selectedTicket.assignedToAdminId) // Exclude current assignee
                    .map((staff) => (
                      <div
                        key={staff.id}
                        className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedStaffId === staff.id.toString()
                            ? 'bg-hostel-gold/10'
                            : ''
                        }`}
                        onClick={() => setSelectedStaffId(staff.id.toString())}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-gray-500">
                              {staff.skills.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              Active tickets
                            </p>
                            <p className="font-medium">{staff.activeTickets}</p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="p-4 text-center text-gray-500">
                    No staff found
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReassignModal(false);
                    setSelectedStaffId('');
                    setReassignReason('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmReassign}
                  disabled={!selectedStaffId || reassignMutation.isPending}
                >
                  {reassignMutation.isPending
                    ? 'Reassigning...'
                    : 'Reassign Ticket'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
