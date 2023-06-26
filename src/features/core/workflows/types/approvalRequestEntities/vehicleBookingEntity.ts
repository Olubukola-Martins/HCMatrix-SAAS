// vehicle
export interface VehicleBookingEntity {
  id: number;
  vehicleId: number;
  employeeId: number;
  date: string;
  duration: number;
  destination: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle;
  employee: Employee;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface Vehicle {
  id: number;
  label: string;
  type: string;
  brand: string;
  model: string;
  plateNumber: string;
  status: string;
  imageUrl?: any;
  cost?: any;
  color?: any;
  description?: any;
  purchaseDate?: any;
  assigneeId?: any;
  dateAssigned?: any;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
