import { TWorkflowApprovalType } from "features/core/workflows/types";
export type TNotificationType = TWorkflowApprovalType & "other";

export type TNotification = {
  id: number;
  type: string;
  employeeId: number;
  title: string;
  message: string;
  content: Content[];
  isRead: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

interface Content {
  booking: Booking;
  approvalStage: ApprovalStage;
}

interface ApprovalStage {}

interface Booking {
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
  avatarUrl?: any;
  companyId: number;
  createdAt: string;
  deletedAt?: any;
  firstName: string;
  updatedAt: string;
  designationId: number;
  hasSelfService: boolean;
}

interface Vehicle {
  id: number;
  cost: string;
  type: string;
  brand: string;
  color: string;
  label: string;
  model: string;
  status: string;
  imageUrl: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  assigneeId: number;
  description: string;
  plateNumber: string;
  dateAssigned: string;
  documentUrls?: any;
  purchaseDate: string;
}
