import { TEmployeeProps } from "features/timeAndAttendance/types";
import { TApprovalStatus } from "types/statuses";

export interface allSwapRequestProps {
  date: string;
  employee: TEmployeeProps;
  department: string;
  defaultShift?: "afternoon" | "night" | "morning";
  newShift?: "afternoon" | "night" | "morning";
  swapPartner: TEmployeeProps;
  status: string;
}

export interface PostMySwapShiftRequestProps {
  shiftFromId: number;
  shiftToId: number;
  shiftPartnerId: number;
  reason: string;
  employeeId?: number;
}

interface IShiftProps {
  id: number;
  name: string;
  isEnabled: boolean;
}

export interface PostMySwapShiftRequestProps {
  createdAt: string;
  reason: string;
  shiftFrom: IShiftProps;
  shiftTo: IShiftProps;
  shiftPartner: TEmployeeProps;
  status: string;
  employee: TEmployeeProps;
}

export interface IGeneralRequestFilter {
  status?: string;
  departmentId?: number;
  employeeId?: number;
}

// the actual shift request entity
export interface TShiftSwapRequest {
  id: number;
  employeeId: number;
  departmentId: number;
  shiftFromId: number;
  shiftToId: number;
  shiftPartnerId: number;
  reason: string;
  status: TApprovalStatus;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  shiftFrom: ShiftFrom;
  shiftTo: ShiftFrom;
  shiftPartner: ShiftPartner;
  employee: Employee;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isOwner: boolean;
  licenseType: string;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designation: {
    department: {
      name: string;
    };
  };
  userId: number;
  avatarUrl: string;
  personalInformation: PersonalInformation;
}

interface ShiftPartner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isOwner: boolean;
  licenseType: string;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  personalInformation: PersonalInformation;
}

interface PersonalInformation {
  gender: string;
  phoneNumber: string;
  eligibility: string;
  exchangeRateId: number;
  addressId: number;
  nin: string;
}

interface ShiftFrom {
  id: number;
  name: string;
  isEnabled: boolean;
}

export interface ISwapPartnerApprovals {
  id: number;
  status: string;
  comment: string;
}



// deleting soon
export interface IAddChatProps {
  user_query: string;
  audio: boolean;
  chat_id: string;
  employee_metadata: Employeemetadata;
}

interface Employeemetadata {
  department_id: string;
  role_id: string;
  group_id: string;
  company_id: string;
  id: string;
}