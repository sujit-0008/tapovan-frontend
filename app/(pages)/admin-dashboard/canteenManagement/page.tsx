import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Today's Meal</CardTitle>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition">
            Edit Meal
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-md">
                  Breakfast
                </span>
              </div>
              <p className="text-gray-600">{mealData.todayMeals.breakfast}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-md">
                  Lunch
                </span>
              </div>
              <p className="text-gray-600">{mealData.todayMeals.lunch}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-md">
                  Dinner
                </span>
              </div>
              <p className="text-gray-600">{mealData.todayMeals.dinner}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
