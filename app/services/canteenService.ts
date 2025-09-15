import api from './api';
import { API_ROUTES } from '../constants/api';
import {
    CreateFoodMenuRequest,
    CreateFoodMenuResponse,
    GenerateMealQRRequest,
    GenerateMealQRResponse,
    GetFoodMenusResponse,
    UpdateFoodMenuRequest,
    UpdateFoodMenuResponse,
    GetMealSkipsResponse
} from '../types/canteen';


export const generateMealQR = async (data: GenerateMealQRRequest): Promise<GenerateMealQRResponse> => {
    const response = await api.post<GenerateMealQRResponse>(API_ROUTES.CANTEEN.GENERATE_MEAL_QR, data);
    return response.data;
};

export const createFoodMenu = async (data: CreateFoodMenuRequest): Promise<CreateFoodMenuResponse> => {
    const response = await api.post<CreateFoodMenuResponse>(API_ROUTES.CANTEEN.CREATE_FOOD_MENU, data);
    return response.data;
};

export const updateFoodMenu = async (id: string, data: UpdateFoodMenuRequest): Promise<UpdateFoodMenuResponse> => {
    const response = await api.put<UpdateFoodMenuResponse>(API_ROUTES.CANTEEN.UPDATE_FOOD_MENU.replace(':id', id), data);
    return response.data;
};

export const getMealSkips = async (): Promise<GetMealSkipsResponse> => {
    const response = await api.get<GetMealSkipsResponse>(API_ROUTES.CANTEEN.GET_MEAL_SKIPS);
    return response.data;
};

export const getFoodMenus = async (date?: string): Promise<GetFoodMenusResponse> => {
    const response = await api.get<GetFoodMenusResponse>(API_ROUTES.CANTEEN.GET_FOOD_MENUS, { params: { date } });
    return response.data;
};