export type TVehicleAssigneeHistory = {
  id: number;
  vehicleId: number;
  assigneeId: number;
  dateAssigned: string;
  dateReturned?: any;
  duration: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  assignee: Assignee;
  vehicle: Vehicle;
};

interface Vehicle {
  id: number;
  label: string;
  type: string;
  brand: string;
  model: string;
  plateNumber: string;
  status: string;
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

interface Assignee {
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
