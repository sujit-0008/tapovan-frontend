
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog'; // Assuming dialog component exists
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { useStaff } from '../../../hooks/useStaff';
import { useCreateStaff } from '../../../hooks/useCreateStaff';
import { useEditStaff } from '../../../hooks/useEditStaff';
import { useDeleteStaff } from '../../../hooks/useDeleteStaff';
import { useVendors } from '../../../hooks/useVendors';
import { Search } from 'lucide-react';

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    skills: '',
    isTapovanNest: false,
    vendorId: '',
    address: '',
    department: '',
  });

  const { data, isLoading, error } = useStaff({ search: searchTerm });
  const { data: vendorsData } = useVendors();
  const { mutate: createStaff, isPending: isCreating } = useCreateStaff();
  const { mutate: editStaff, isPending: isEditing } = useEditStaff();
  const { mutate: deleteStaff, isPending: isDeleting } = useDeleteStaff();

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      skills,
      isTapovanNest: formData.isTapovanNest,
      ...(formData.isTapovanNest && { address: formData.address, department: formData.department }),
      ...(formData.vendorId && { vendorId: parseInt(formData.vendorId) }),
    };
    createStaff(data, {
      onSuccess: () => {
        setShowCreateModal(false);
        setFormData({ name: '', phone: '', email: '', password: '', skills: '', isTapovanNest: false, vendorId: '', address: '', department: '' });
      },
      onError: (error) => alert(error.message || 'Failed to create staff'),
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      ...(formData.password && { password: formData.password }),
      skills,
      isTapovanNest: formData.isTapovanNest,
      ...(formData.isTapovanNest && { address: formData.address, department: formData.department }),
      ...(formData.vendorId && { vendorId: parseInt(formData.vendorId) }),
    };
    if (editingStaffId) {
      editStaff({ id: editingStaffId, data }, {
        onSuccess: () => {
          setEditingStaffId(null);
          setFormData({ name: '', phone: '', email: '', password: '', skills: '', isTapovanNest: false, vendorId: '', address: '', department: '' });
        },
        onError: (error) => alert(error.message || 'Failed to update staff'),
      });
    }
  };

  const handleEdit = (staff: any) => {
    setEditingStaffId(staff.id.toString());
    setFormData({
      name: staff.name,
      phone: staff.phone,
      email: staff.email,
      password: '',
      skills: staff.skills ? staff.skills.join(', ') : '',
      isTapovanNest: staff.isTapovanNest,
      vendorId: staff.vendor ? staff.vendor.id.toString() : '',
      address: staff.address || '',
      department: staff.department || '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      deleteStaff(id, {
        onSuccess: () => alert('Staff deleted successfully'),
        onError: (error) => alert(error.message || 'Failed to delete staff'),
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Staff Management</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          Add New Staff
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search staff"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hostel-gold"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-gray-500 text-sm">Loading staff...</p>}
          {error && <p className="text-red-500 text-sm">Error: {error.message}</p>}
          {data?.staff.length === 0 && <p className="text-gray-500 text-sm">No staff found.</p>}
          {data?.staff && data.staff.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm sm:text-base">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm sm:text-base">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-sm sm:text-base">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-sm sm:text-base">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-sm sm:text-base">Association</th>
                    <th className="text-left py-3 px-4 font-medium text-sm sm:text-base">Skills</th>
                    <th className="text-left py-3 px-4 font-medium text-sm sm:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.staff?.map((staff, index) => (
                    <tr key={staff.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-sm sm:text-base">{staff.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {staff.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm sm:text-base text-gray-600">{staff.email}</td>
                      <td className="py-3 px-4 text-sm sm:text-base text-gray-600">{staff.phone}</td>
                      <td className="py-3 px-4 text-sm sm:text-base">
                        {staff.isTapovanNest ? 'TAPOVAN NEST' : staff.vendor?.companyName || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          {/* {staff.active ? 'Active' : 'Inactive'} */}
                          {staff.skills}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                          
                            
                            
                            onClick={() => handleEdit(staff)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            className='bg-red-500 text-white'
                          
                            onClick={() => handleDelete(staff.id.toString())}
                            disabled={isDeleting}
                          >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Staff Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-[425px] bg-white overflow-y-auto max-h-[90vh] rounded-xl">
          <DialogHeader>
            <DialogTitle>Add New Staff</DialogTitle>
          </DialogHeader>
          <div className="p-4">
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone *</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password *</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                  <Input
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g., Plumbing, Electrical"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tapovan Nest Staff</label>
                  <input
                    type="checkbox"
                    checked={formData.isTapovanNest}
                    onChange={(e) => setFormData({ ...formData, isTapovanNest: e.target.checked })}
                    className="h-5 w-5 text-hostel-gold focus:ring-hostel-gold"
                  />
                  {formData.isTapovanNest ? (
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <Input
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="rounded-xl mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <Input
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="rounded-xl mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Associated Vendor *</label>                      <Select
                        value={formData.vendorId}
                        onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                        required={!formData.isTapovanNest}
                        className="rounded-xl mt-1"
                      >
                        <option value="">Select Vendor</option>
                        {vendorsData?.vendors.map((vendor) => (
                          <option key={vendor.id} value={vendor.id.toString()}>{vendor.companyName}</option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => { setShowCreateModal(false); setFormData({ name: '', phone: '', email: '', password: '', skills: '', isTapovanNest: false, vendorId: '', address: '', department: '' }); }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Staff'}
                  </Button>
                </DialogFooter>
              </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Modal */}
      <Dialog open={!!editingStaffId} onOpenChange={(isOpen) => !isOpen && setEditingStaffId(null)}>
        <DialogContent className="sm:max-w-[425px] bg-white overflow-y-auto max-h-[90vh] rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
          </DialogHeader>
          <div className="p-4">
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone *</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                  <Input
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g., Plumbing, Electrical"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tapovan Nest Staff</label>
                  <input
                    type="checkbox"
                    checked={formData.isTapovanNest}
                    onChange={(e) => setFormData({ ...formData, isTapovanNest: e.target.checked })}
                    className="h-5 w-5 text-hostel-gold focus:ring-hostel-gold"
                  />
                  {formData.isTapovanNest ? (
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <Input
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="rounded-xl mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <Input
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="rounded-xl mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Associated Vendor *</label>                      <Select
                        value={formData.vendorId}
                        onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                        required={!formData.isTapovanNest}
                        className="rounded-xl mt-1"
                      >
                        <option value="">Select Vendor</option>
                        {vendorsData?.vendors.map((vendor) => (
                          <option key={vendor.id} value={vendor.id.toString()}>{vendor.companyName}</option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => { setEditingStaffId(null); setFormData({ name: '', phone: '', email: '', password: '', skills: '', isTapovanNest: false, vendorId: '', address: '', department: '' }); }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isEditing}>
                    {isEditing ? 'Updating...' : 'Update Staff'}
                  </Button>
                </DialogFooter>
              </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};