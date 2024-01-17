export type TCompanyEmployeeWithLicense = {
  id: number;
  companySubscriptionId: number;
  employeeId: number;
  licenseType: string;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
};

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
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
