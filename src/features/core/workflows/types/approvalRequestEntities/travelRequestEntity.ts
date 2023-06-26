export type TravelRequestEntity = {
  id: number;
  employeeId: number;
  location: string;
  reason: string;
  departureDate: string;
  arrivalDate: string;
  duration: number;
  clientName: string;
  cost: string;
  billableToClient: boolean;
  priority: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
};

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
  avatarUrl?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
