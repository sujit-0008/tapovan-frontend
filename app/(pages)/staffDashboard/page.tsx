"use client";
import {  useState } from 'react';
import { useStaffTickets, useStaffTicketDetails, useUpdateMyTicketStatus } from '../../hooks/useStaffTickets';
import { TicketStatus } from '../../types/ticket';

const statusOptions: TicketStatus[] = ['PENDING', 'IN_PROGRESS', 'CLOSED'];

const Badge = ({ status }: { status: TicketStatus }) => {
  const color = status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  return <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{status.replace('_', ' ')}</span>;
};

const StaffDashboard = () => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data, isLoading } = useStaffTickets(statusFilter, page);
  const { data: details, isLoading: loadingDetails } = useStaffTicketDetails(selectedId ? String(selectedId) : undefined);
  const updateMutation = useUpdateMyTicketStatus();

  const tickets = data?.tickets || [];
  const totalPages = data?.pages || 1;

  const handleStatusChange = async (id: number, next: TicketStatus) => {
    await updateMutation.mutateAsync({ id: String(id), status: next });
  };

  const nextActions = (s: TicketStatus): TicketStatus[] => {
    if (s === 'PENDING') return ['IN_PROGRESS'];
    if (s === 'IN_PROGRESS') return ['CLOSED'];
    return [];
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Ticket Assignments</h1>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-3 py-2"
            value={statusFilter}
            onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}
          >
            <option value="">All</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="font-semibold">Tickets</div>
              <div className="text-sm text-gray-500">Page {page} / {totalPages}</div>
            </div>
            <div className="divide-y">
              {isLoading ? (
                <div className="p-6 text-gray-500">Loading tickets...</div>
              ) : tickets.length === 0 ? (
                <div className="p-6 text-gray-500">No tickets found.</div>
              ) : (
                tickets.map((t) => (
                  <div key={t.id} className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedId === t.id ? 'bg-gray-50' : ''}`} onClick={() => setSelectedId(t.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge status={t.status as TicketStatus} />
                        <div className="font-medium">#{t.id} • {t.category}</div>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-gray-600 mt-1 line-clamp-2">{t.description}</div>
                    <div className="mt-2 flex gap-2">
                      {nextActions(t.status as TicketStatus).map((n) => (
                        <button
                          key={n}
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(t.id, n); }}
                          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                          disabled={updateMutation.isPending}
                        >
                          Mark {n.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 flex justify-between items-center border-t">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >Prev</button>
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
              >Next</button>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b font-semibold">Ticket Details</div>
            {selectedId ? (
              loadingDetails ? (
                <div className="p-6 text-gray-500">Loading...</div>
              ) : details?.ticket ? (
                <div className="p-4 space-y-3">
                  <div className="text-sm text-gray-500">Ticket #{details.ticket.id}</div>
                  <div className="text-lg font-semibold">{details.ticket.category}</div>
                  <Badge status={details.ticket.status as TicketStatus} />
                  <div className="text-gray-700">{details.ticket.description}</div>
                  {details.ticket.photoUrl && (
                    <img src={details.ticket.photoUrl} alt="Ticket" className="rounded border" />
                  )}
                  <div className="text-sm text-gray-500">Raised by: {details.ticket.raisedBy.firstName} {details.ticket.raisedBy.lastName}</div>
                  {details.ticket.roomNumber && (
                    <div className="text-sm text-gray-500">Room: {details.ticket.roomNumber}</div>
                  )}

                  <div>
                    <div className="mt-4 font-medium">Recent Activity</div>
                    <div className="mt-2 space-y-2 max-h-48 overflow-auto">
                      {details.ticket.auditLogs && details.ticket.auditLogs.length > 0 ? (
                        details.ticket.auditLogs.map((log) => (
                          <div key={log.id} className="text-sm">
                            <div className="text-gray-700">{log.action}</div>
                            <div className="text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
                            <div className="text-gray-600">{log.details}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 text-sm">No activity yet.</div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {nextActions(details.ticket.status as TicketStatus).map((n) => (
                      <button
                        key={n}
                        onClick={() => handleStatusChange(details.ticket.id, n)}
                        className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        disabled={updateMutation.isPending}
                      >
                        Mark {n.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-gray-500">Ticket not found.</div>
              )
            ) : (
              <div className="p-6 text-gray-500">Select a ticket to view details.</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StaffDashboard;
