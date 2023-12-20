import { TLicenseType } from "features/authentication/types/auth-user";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";

export type TCompanyEmployeeDashboard = {
  assets: Assets;
  pendingApprovals: PendingApprovals;
  celebrationsAndHolidays: CelebrationsAndHolidays;
};

interface CelebrationsAndHolidays {
  birthdays: Birthdays;
  workAnniversaries: WorkAnniversary[];
  holidays: Holiday[];
}

interface Holiday {
  title: string;
  date: string;
}

interface WorkAnniversary {
  startDate: string;
  employee: Employee;
}

interface Birthdays {
  today: Today[];
  upcoming: Today[];
}

interface Today {
  dob: string;
  employee: Employee;
}

interface Employee {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

interface PendingApprovals {
  result: TApprovalRequest[];
  totalCount: number;
}

interface Assets {
  result: Result[];
  totalCount: number;
}

interface Result {
  id: number;
  assetId: number;
  assigneeId: number;
  dateAssigned: string;
  dateReturned?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  asset: Asset;
  assignee: Assignee;
}

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

interface Asset {
  id: number;
  name: string;
  typeId: number;
  status: string;
  imageUrl?: any;
  uid: string;
  serialNumber: string;
  brand: string;
  model: string;
  cost: string;
  vendor: string;
  purchaseDate: string;
  color: string;
  description: string;
  assigneeId: number;
  dateAssigned: string;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  type: Type;
}

interface Type {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
