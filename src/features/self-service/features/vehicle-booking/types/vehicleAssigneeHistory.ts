import { TLicenseType } from "features/authentication/types/auth-user";
import { TVehicle } from "../hooks/useFetchVehicles";

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
  vehicle: TVehicle;
};

interface Assignee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  licenseType: TLicenseType;
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
