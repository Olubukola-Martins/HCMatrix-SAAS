import { TVehicleStatus, TVehicleType } from "../hooks/useCreateVehicle";

export type TVehicleBookingAnalytics = {
  approved: number;
  pending: number;
  rejected: number;
  vehicleInUse: TVehicleInUse;
};

export interface TVehicleInUse {
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
  assigneeId: number;
  dateAssigned: string;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
