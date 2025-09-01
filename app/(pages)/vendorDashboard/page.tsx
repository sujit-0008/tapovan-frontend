"use client";
import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";

export default function VendorDashboard() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    meal: "",
    items: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const stats = [
    { title: "Total Meals Sold", value: "150", bgColor: "bg-muted/30" },
    { title: "Meals Scanned", value: "120", bgColor: "bg-muted/30" },
    { title: "Meals Not Scanned", value: "30", bgColor: "bg-muted/30" }
  ];

  const todaysMeals = [
    { meal: "BreakFast", items: "Poha , Chai , Coffee" },
    { meal: "Lunch", items: "Roti , Rice , Dal , Aloo Sabji , salad , Dahi" },
    { meal: "Dinner", items: "Roti , Rice , Dal , Mix veg , salad , peanut chutney" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-hostel-gold to-hostel-burgundy p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Vendor Food Dashboard</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-hostel-burgundy">
            Dashboard
          </button>
          <button className="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-hostel-burgundy">
            Profile
          </button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-hostel-burgundy font-bold">A</span>
          </div>
        </div>
      </div> */}

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={stat.bgColor}>
              <CardContent className="p-6 text-center">
                <h3 className="text-sm text-muted-foreground mb-2">{stat.title}</h3>
                <p className="text-4xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Meal Management */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Today's Meal Management</h2>
          <Card className="bg-muted/20">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                    <input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="time" className="text-sm font-medium text-gray-700">Time</label>
                    <input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="meal" className="text-sm font-medium text-gray-700">Meal</label>
                  <select
                    id="meal"
                    value={formData.meal}
                    onChange={(e) => handleInputChange("meal", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                  >
                    <option value="">Select Meal</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snacks">Snacks</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="items" className="text-sm font-medium text-gray-700">Items</label>
                  <input
                    id="items"
                    placeholder="Enter meal items"
                    value={formData.items}
                    onChange={(e) => handleInputChange("items", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    id="notes"
                    placeholder="Additional notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white min-h-[100px] focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="px-6 py-2 rounded-md bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium"
                >
                  Create QR Code
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Today's Meal */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Today's Meal</h2>
          <div className="space-y-4">
            {todaysMeals.map((meal, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{meal.meal}</h3>
                      <p className="text-muted-foreground">{meal.items}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
