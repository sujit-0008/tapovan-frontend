"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Utensils,
  Gamepad2,
  Heart,
  Truck,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


const sidebarItems = [
  { path: "/admin-dashboard", label: "Notification", icon: LayoutDashboard },
  { path: "/admin-dashboard/UserManagement", label: "User Management", icon: Users },
  { path: "/admin-dashboard/canteenManagement", label: "Canteen", icon: Utensils },
  { path: "/admin-dashboard/gameRoomManagement", label: "Game Room", icon: Gamepad2 },
  { path: "/admin-dashboard/allStudent", label: "All Student", icon: Heart },
  { path: "/admin-dashboard/allVendor", label: "All Vendor", icon: Truck },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`bg-muted/20 border-r transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg">Tapovan Boys Hostel</h2>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
          )}
          <button
            
    
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-hostel-gold text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logo at bottom */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-hostel-gold rounded-full flex items-center justify-center">
            <Star className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
