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
// Interface for the entire API response from the getFoodMenus endpoint
export interface GetFoodMenusResponse {
  weekStart: string,
  weekEnd: string,
  menus: {
    [date: string]: {
      [key in MealType]?: FoodMenu[];
    }
  };
  totalMenus: number;
}


export interface DailyFoodMenuInput {
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  items: string[];
  notes?: string;
}

export interface CreateFoodMenuRequest {
  date: string;
  menus: DailyFoodMenuInput[];
}

export interface CreateFoodMenuResponse {
  message: string;
  // When creating menus for multiple meal types we return an array,
  // for backwards compatibility the API may also return a single menu.
  menu?: FoodMenu;
  menus?: FoodMenu[];
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

export interface GetMealSkipsResponse {
  counts: {
    BREAKFAST: number;
    LUNCH: number;
    DINNER: number;
    SNACK: number;
  };
  date: string;
}

// export interface GetFoodMenusResponse {
//   menus: FoodMenu | null;
// }

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}

export interface GetMealScanCountsResponse {
  counts: {
    BREAKFAST: number;
    LUNCH: number;
    DINNER: number;
    SNACK: number;
  };
  date: string;
}

export interface GetMealScanCountsRequest {
  date?: string;
}