'use client'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useFoodMenus } from '../../../hooks/useFoodMenus';

const mealData = {
  totalStudents: 150,
  mealsTaken: 120,
  todayMeals: {
    breakfast: "Poha, Chai, Coffee",
    lunch: "Roti, Rice, Dal, Aloo Sabji, salad, Dahi",
    dinner: "Roti, Rice, Dal, Mix veg, salad, peanut chutney"
  }
};

export default function CanteenManagement() {
   const { data: menusData, isLoading: isMenusLoading } = useFoodMenus();
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Canteen Management</h1>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Canteen Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-hostel-gold">
                {mealData.totalStudents}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Meals Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-hostel-gold">
                {mealData.mealsTaken}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
    </div>
  );
}
