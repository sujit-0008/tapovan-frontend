'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog';
import { useTickets, useUpdateTicket, useAssignTicketBySkills, useStaffBySkills, useSkillsForCategory } from '../../../hooks/useTickets';
import { TicketStatus } from '../../../types/ticket'
import { Search, Users, Wrench, CheckCircle, Clock, AlertCircle, ChevronDown } from 'lucide-react';

export default function AdminTicketDashboard() {
  const [statusFilter, setStatusFilter] = useState<TicketStatus>('PENDING');
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchSkills, setSearchSkills] = useState('');
  const [assignForm, setAssignForm] = useState({ status: 'IN_PROGRESS' as TicketStatus, assignedToAdminId: '', assignedToVendorId: '' });
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openUpdateStatusDropdown, setOpenUpdateStatusDropdown] = useState(false);

  const { data, isLoading } = useTickets(statusFilter, page);
  const { data: staffData } = useStaffBySkills(searchSkills);
  const { data: skillsData } = useSkillsForCategory();
  const updateMutation = useUpdateTicket();
  const assignMutation = useAssignTicketBySkills();

  const stats = {
    PENDING: data?.tickets.filter(t => t.status === 'PENDING').length || 0,
    IN_PROGRESS: data?.tickets.filter(t => t.status === 'IN_PROGRESS').length || 0,
    CLOSED: data?.tickets.filter(t => t.status === 'CLOSED').length || 0,
  };

  const getStatusColor = (status: TicketStatus) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'CLOSED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssignBySkills = (ticket: any) => {
    if (confirm(`Auto-assign ticket #${ticket.id} using skill matching?`)) {
      assignMutation.mutate(ticket.id.toString(), {
        onSuccess: (res) => {
          alert(`Assigned to ${res.assignedTo.name}`);
        },
        onError: (err: any) => {
          alert(err.message || 'No staff available');
        },
      });
    }
  };

  const handleUpdate = () => {
    updateMutation.mutate(
      { id: selectedTicket.id.toString(), data: assignForm },
      {
        onSuccess: () => {
          setShowUpdateModal(false);
          setSelectedTicket(null);
        },
      }
    );
  };

  const openUpdateModal = (ticket: any) => {
    setSelectedTicket(ticket);
    setAssignForm({
      status: ticket.status,
      assignedToAdminId: ticket.assignedToAdminId?.toString() || '',
      assignedToVendorId: ticket.assignedToVendorId?.toString() || '',
    });
    setShowUpdateModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Ticket Management</h1>
        <Button onClick={() => setShowAssignModal(true)} className="flex items-center">
          <Users className="mr-2 h-4 w-4" /> Assign by Skills
        </Button>
      </div>

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
            <p className="text-center py-8 text-gray-500">Loading tickets...</p>
          ) : (
            <div className="space-y-4">
              {data?.tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">#{ticket.id} - {ticket.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Raised by: {ticket.raisedBy.firstName} {ticket.raisedBy.lastName}</span>
                        <span>{new Date(ticket.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      {ticket.assignedToAdmin && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {ticket.assignedToAdmin.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {ticket.status === 'PENDING' && (
                      <Button  onClick={() => handleAssignBySkills(ticket)}>
                        Auto Assign
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => openUpdateModal(ticket)}>
                      Update
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
        
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {data.page} of {data.pages}
              </span>
              <Button
                variant="outline"
        
                onClick={() => setPage(p => Math.min(data.pages, p + 1))}
                disabled={page === data.pages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assign by Skills Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>Find Staff by Skills</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Skills (comma-separated)</label>
              <Input
                placeholder="plumbing, electrical, cleaning"
                value={searchSkills}
                onChange={(e) => setSearchSkills(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {staffData?.staff.map((s) => (
                <div key={s.id} className="border rounded p-3 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{s.name}</p>
                    <p className="text-sm text-gray-600">{s.email} | {s.phone}</p>
                    <p className="text-xs text-gray-500">Skills: {s.skills.join(', ')}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {s.activeTickets} active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Ticket Modal */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Ticket #{selectedTicket?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <button
                  onClick={() => setOpenUpdateStatusDropdown(!openUpdateStatusDropdown)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                >
                  <span>{assignForm.status}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {openUpdateStatusDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {['PENDING', 'IN_PROGRESS', 'CLOSED'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setAssignForm({ ...assignForm, status: status as TicketStatus });
                          setOpenUpdateStatusDropdown(false);
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Staff (Optional)</label>
              <Input
                placeholder="Staff ID"
                value={assignForm.assignedToAdminId}
                onChange={(e) => setAssignForm({ ...assignForm, assignedToAdminId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Vendor (Optional)</label>
              <Input
                placeholder="Vendor ID"
                value={assignForm.assignedToVendorId}
                onChange={(e) => setAssignForm({ ...assignForm, assignedToVendorId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Updating...' : 'Update Ticket'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}