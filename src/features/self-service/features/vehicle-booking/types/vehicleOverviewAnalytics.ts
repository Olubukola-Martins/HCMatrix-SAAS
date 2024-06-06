import { TVehicleStatus, TVehicleType } from "../hooks/useCreateVehicle";

export type TVehicleOverviewAnalytics = {
  car: number;
  motorcycle: number;
  truck: number;
  bus: number;
  totalVehicles: TotalVehicles;
  vehicleByStatus: VehicleByStatus;
  recentlyAddedVehicles: RecentlyAddedVehicle[];
};

interface RecentlyAddedVehicle {
  id: number;
  label: string;
  type: TVehicleType;
  brand: string;
  model: string;
  plateNumber: string;
  status: TVehicleStatus;
  imageUrl: string;
  cost: string;
  color: string;
  description: string;
  purchaseDate: string;
  assigneeId?: any;
  dateAssigned?: any;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface VehicleByStatus {
  unassigned: number;
  assigned: number;
  "in-repair": number;
  condemned: number;
}

interface TotalVehicles {
  totalYearCount: number;
  countsByMonth: CountsByMonth;
}

interface CountsByMonth {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}
