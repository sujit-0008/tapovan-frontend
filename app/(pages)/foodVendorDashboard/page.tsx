'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion } from '../../components/ui/accordion';
import { QRCodeCanvas } from 'qrcode.react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useGenerateMealQR } from '../../hooks/useGenerateMealQR';
import { useCreateFoodMenu } from '../../hooks/useCreateFoodMenu';
import { useUpdateFoodMenu } from '../../hooks/useUpdateFoodMenu';
import { useMealSkips } from '../../hooks/useMealSkips';
import { useFoodMenus } from '../../hooks/useFoodMenus';
import { useVendorDetails } from '../../hooks/useVendorDetails';
import { useMealScanCounts } from '../../hooks/useMealScanCounts';
import { useAuthStore } from '../../store/authStore';
import { useQueryClient } from '@tanstack/react-query';

export default function VendorDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const vendorId = user?.id?.toString() || '';
  const queryClient = useQueryClient();
  // State declarations FIRST
  const [qrForm, setQrForm] = useState({ mealType: '', date: '', time: '' });
  const [menuForm, setMenuForm] = useState({ mealType: '', date: '', items: '', notes: '' });
  const [editMenuId, setEditMenuId] = useState<string | null>(null);
  const today = new Date().toISOString().split('T')[0];
  const [scanDate, setScanDate] = useState(today);

  const { data: scanCountsData, isLoading: isScanCountsLoading } =
    useMealScanCounts({ date: scanDate });
  // Then hook calls
  const { data: vendorData, isLoading: isVendorLoading } = useVendorDetails(vendorId);
  const { mutate: generateQR, data: qrData, isPending: isGeneratingQR } = useGenerateMealQR();
  const { mutate: createMenu, isPending: isCreatingMenu } = useCreateFoodMenu();
  const { data: skipsData, isLoading: isSkipsLoading } = useMealSkips();
  const { data: menusData, isLoading: isMenusLoading } = useFoodMenus();
  const updateMenu = useUpdateFoodMenu(editMenuId || '');

  const { data: mealScanCountsData, isLoading: isMealScanCountsLoading } = useMealScanCounts({ date: today });  
  console.log(mealScanCountsData);  
  if (isVendorLoading) return <p className="p-4 sm:p-6 text-gray-500 text-sm">Loading...</p>;
  if (vendorData?.vendor.category !== "FOOD_VENDOR")  {
    router.push('/');
    return null;
  }

  const handleQrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!qrForm.mealType || !qrForm.date || !qrForm.time) {
      alert('Please fill in all fields');
      return;
    }

    generateQR({
      mealType: qrForm.mealType as 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK',
      date: qrForm.date,
      time: qrForm.time,
    });
  };

  const handleMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = menuForm.items.split(',').map((item) => item.trim()).filter(Boolean);
    const data = {
      mealType: menuForm.mealType as 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK',
      date: menuForm.date,
      items,
      notes: menuForm.notes || undefined,
    };
    
    if (editMenuId) {
      updateMenu.mutate(data, {
        onSuccess: () => {
          setEditMenuId(null);
          setMenuForm({ mealType: '', date: '', items: '', notes: '' });
        },
      });
    } else {
      createMenu(data, {
        onSuccess: () => setMenuForm({ mealType: '', date: '', items: '', notes: '' }),
      });
    }
  };

  const handleEditMenu = (menu: any) => {
    setEditMenuId(menu.id.toString());
    setMenuForm({
      mealType: menu.mealType,
      date: new Date(menu.date).toISOString().split('T')[0],
      items: menu.items.join(', '),
      notes: menu.notes || '',
    });
    // Scroll to Create/Edit Menu section
    document.getElementById('menu-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ...rest of the component remains the same...

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Food Vendor Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/admin-dashboard/vendors/${vendorId}` )}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Profile
          </button>
          <button
            onClick={() => useAuthStore.getState().logout()}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </div>

  

      {/* Generate QR Code */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Meal QR Code</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleQrSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date *</label>
                <input
                  type="date"
                  value={qrForm.date}
                  onChange={(e) => setQrForm({ ...qrForm, date: e.target.value })}
                  required                  
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isGeneratingQR}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time *</label>
                <input
                  type="time"
                  value={qrForm.time}
                  onChange={(e) => setQrForm({ ...qrForm, time: e.target.value })}
                  required                  
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isGeneratingQR}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meal Type *</label>
              < select
                value={qrForm.mealType}
                onChange={(e) => setQrForm({ ...qrForm, mealType: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isGeneratingQR}
              >
                <option value="">Select Meal</option>
                {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={isGeneratingQR} className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition disabled:opacity-50">
              {isGeneratingQR ? 'Generating...' : 'Generate QR Code'}
            </button>
          </form>
          {qrData?.qrUrl && (
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm text-gray-500 mb-2">QR Code for {qrForm.mealType}</p>
              <div className="flex justify-center">
                <QRCodeCanvas 
                  value={qrData.qrUrl} 
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Date: {qrForm.date} | Time: {qrForm.time}</p>
              <a 
                href={qrData.qrUrl} 
                download={`meal-qr-${qrForm.mealType}-${qrForm.date}.png`}
                className="mt-3 inline-block px-4 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white text-sm font-medium transition"
              >
                Download QR Code
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Menu */}
      <Card id='menu-form' >
        <CardHeader>
          <CardTitle>{editMenuId ? 'Edit Menu' : 'Create Menu'}</CardTitle>
        </CardHeader>
        <CardContent>


          <form onSubmit={handleMenuSubmit} className="space-y-4 sm:space-y-6" >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date *</label>
                <input
                  type="date"
                  value={menuForm.date}
                  onChange={(e) => setMenuForm({ ...menuForm, date: e.target.value })}
                  required                  
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isCreatingMenu}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meal Type *</label>
                <select
                  value={menuForm.mealType}
                  onChange={(e) => setMenuForm({ ...menuForm, mealType: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                  disabled={isCreatingMenu}
                >
                  <option value="">Select Meal</option>
                  {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Items (comma-separated) *</label>
              <input
                value={menuForm.items}
                onChange={(e) => setMenuForm({ ...menuForm, items: e.target.value })}
                required
                placeholder="e.g., Roti, Rice, Dal"
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                disabled={isCreatingMenu}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <input
                value={menuForm.notes}
                onChange={(e) => setMenuForm({ ...menuForm, notes: e.target.value })}
                placeholder="Additional notes"
                className="w-full rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold min-h-[100px]"
                disabled={isCreatingMenu}
              />
            </div>
            <div className="flex justify-end gap-4">
              {editMenuId && (
                <button
                  type="button"                  
                  onClick={() => {
                    setEditMenuId(null);
                    setMenuForm({ mealType: '', date: '', items: '', notes: '' });
                  }}
                  disabled={isCreatingMenu}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
              <button type="submit" disabled={isCreatingMenu} className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition disabled:opacity-50">
                {isCreatingMenu ? 'Saving...' : editMenuId ? 'Update Menu' : 'Create Menu'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Weekly Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Menu</CardTitle>
          {menusData && (
            <p className="text-sm text-gray-500 mt-2">
              Week of {new Date(menusData.weekStart).toLocaleDateString()} - {new Date(menusData.weekEnd).toLocaleDateString()}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {isMenusLoading ? (
            <p className="text-sm text-gray-500">Loading menus...</p>
          ) : !menusData?.menus || Object.keys(menusData.menus).length === 0 ? (
            <p className="text-sm text-gray-500">No menu for this week</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Breakfast</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Lunch</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Snack</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Dinner</th>
                  {/* <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(menusData.menus).map(([date, meals]: [string, any]) => (
                    <tr key={date} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                        {meals.BREAKFAST ? (
                          <div className="space-y-1">
                            <p>{meals.BREAKFAST[0]?.items.join(', ')}</p>
                            {meals.BREAKFAST[0]?.notes && (
                              <p className="text-xs text-gray-400 italic">Note: {meals.BREAKFAST[0].notes}</p>
                            )}
                            <button
                              onClick={() => handleEditMenu(meals.BREAKFAST[0])}
                           className="px-3 py-1 bg-hostel-gold cursor-pointer text-white  rounded hover:bg-blue-200 text-xs font-medium transition"
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                        {meals.LUNCH ? (
                          <div className="space-y-1">
                            <p>{meals.LUNCH[0]?.items.join(', ')}</p>
                            {meals.LUNCH[0]?.notes && (
                              <p className="text-xs text-gray-400 italic">Note: {meals.LUNCH[0].notes}</p>
                            )}
                            <button
                              onClick={() => handleEditMenu(meals.LUNCH[0])}
                             className="px-3 py-1 bg-hostel-gold cursor-pointer text-white  rounded hover:bg-blue-200 text-xs font-medium transition"
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                        {meals.SNACK ? (
                          <div className="space-y-1">
                            <p>{meals.SNACK[0]?.items.join(', ')}</p>
                            {meals.SNACK[0]?.notes && (
                              <p className="text-xs text-gray-400 italic">Note: {meals.SNACK[0].notes}</p>
                            )}
                            <button
                              onClick={() => handleEditMenu(meals.SNACK[0])}
                            className="px-3 py-1 bg-hostel-gold cursor-pointer text-white  rounded hover:bg-blue-200 text-xs font-medium transition"
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                        {meals.DINNER ? (
                          <div className="space-y-1">
                            <p>{meals.DINNER[0]?.items.join(', ')}</p>
                            {meals.DINNER[0]?.notes && (
                              <p className="text-xs text-gray-400 italic">Note: {meals.DINNER[0].notes}</p>
                            )}
                            <button
                              onClick={() => handleEditMenu(meals.DINNER[0])}
                       className="px-3 py-1 bg-hostel-gold cursor-pointer text-white  rounded hover:bg-blue-200 text-xs font-medium transition"
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {/* <td className="border border-gray-300 px-4 py-3 text-sm">
                        <button
                          onClick={() => {
                            // You can add a delete function or navigate to date
                            console.log('View details for', date);
                          }}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium transition"
                        >
                          Details
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tomorrow's Meal Skips */}
      <Card>
        <CardHeader>
          <CardTitle>Tomorrow's Meal Skips</CardTitle>
        </CardHeader>
        <CardContent>
          {isSkipsLoading ? (
            <p className="text-sm text-gray-500">Loading meal skips...</p>
          ) : !skipsData?.skips.length ? (
            <p className="text-sm text-gray-500">No meal skips for tomorrow</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {Object.entries(
                  skipsData.skips.reduce((acc, skip) => {
                    acc[skip.mealType] = (acc[skip.mealType] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([mealType, count]) => (
                  <div key={mealType} className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">{mealType}: <span className='text-green'>{count}</span> </p>
                  </div>
                ))}
              </div> 
              {/* <Card key={skip.id} className="bg-muted/20">
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-sm font-medium text-gray-700">
                      {skip.student.firstName} {skip.student.lastName} ({skip.student.email})
                    </p>
                    <p className="text-sm text-gray-500">Date: {new Date(skip.date).toLocaleDateString()}</p>
                  </CardContent>
                </Card> */}
                
              {/* ))} */}
            </div>
          )}
        </CardContent>
      </Card>

          {/* Stats (Placeholder) */}
    {/* Meal Scan Counts */}
    <Card>
      <CardHeader>
        <CardTitle>Meal Scan Counts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <label className="text-sm text-gray-700">Date</label>
          <input
            type="date"
            value={scanDate}
            max={today}
            onChange={(e) => setScanDate(e.target.value)} // changing this state triggers refetch
            className="w-full sm:w-52 rounded-xl border border-gray-300 bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
          />
        </div>

        {isScanCountsLoading ? (
          <p className="text-sm text-gray-500">Loading scan counts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'] as const).map((meal) => (
              <Card key={meal} className="bg-muted/30">
                <CardContent className="p-4 sm:p-6 text-center">
                  <h3 className="text-sm text-muted-foreground mb-2">{meal}</h3>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {scanCountsData?.counts[meal] ?? 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {scanCountsData?.date || scanDate}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}
