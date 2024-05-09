import { TLicenseType } from "features/authentication/types/auth-user";

export interface VehicleBooking {
  id: number;
  date: string;
  status: string;
  vehicle: Vehicle;
  duration: number;
  employee: Employee;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  vehicleId: number;
  employeeId: number;
  destination: string;
}

interface Employee {
  id: number;
  email: string;
  empUid: string;
  roleId: number;
  status: string;
  userId: number;
  lastName: string;
  avatarUrl: string;
  companyId: number;
  createdAt: string;
  deletedAt?: any;
  firstName: string;
  updatedAt: string;
  designationId: number;
  licenseType: TLicenseType;
}

interface Vehicle {
  id: number;
  cost?: any;
  type: string;
  brand: string;
  color?: any;
  label: string;
  model: string;
  status: string;
  imageUrl?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  assigneeId?: any;
  description?: any;
  plateNumber: string;
  dateAssigned?: any;
  documentUrls?: any;
  purchaseDate?: any;
}
