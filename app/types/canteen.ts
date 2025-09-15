export interface GenerateMealQRRequest {
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  date: string;
  time: string;
}

export interface GenerateMealQRResponse {
  message: string;
  qrUrl: string;
}

// Enum for the different meal types, matching your Prisma schema
export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
}

// Interface for the Vendor information included in the menu
export interface MenuVendor {
  name: string;
}

// Interface for a single food menu item in the response
export interface FoodMenu {
  id: number;
  vendorId: number;
  mealType: MealType;
  date: string; // Dates are typically serialized as ISO strings in JSON
  items: string[];
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  vendor: MenuVendor;
}

// Interface for the entire API response from the getFoodMenus endpoint
export interface GetFoodMenusResponse {
  menus: FoodMenu[];
}


export interface CreateFoodMenuRequest {
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  date: string;
  items: string[];
  notes?: string;
}

export interface CreateFoodMenuResponse {
  message: string;
  menu: FoodMenu;
}

export interface UpdateFoodMenuRequest {
  mealType?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  date?: string;
  items?: string[];
  notes?: string;
}

export interface UpdateFoodMenuResponse {
  message: string;
  menu: FoodMenu;
}

export interface MealSkip {
  id: number;
  studentId: number;
  date: string;
  createdAt: string;
  student: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface GetMealSkipsResponse {
  skips: MealSkip[];
}

// export interface GetFoodMenusResponse {
//   menus: FoodMenu | null;
// }

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}