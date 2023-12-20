export type TCompanySubscriptionTransaction = {
  id: number;
  companySubscriptionId: number;
  vat: string;
  discount: string;
  totalAmount: string;
  totalAmountPaid: string;
  status: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  companySubscription: CompanySubscription;
};

interface CompanySubscription {
  id: number;
  companyId: number;
  isActive: boolean;
  isFreeTrial: boolean;
  autoRenew: boolean;
  billingCycle: string;
  priceType: string;
  startDate: string;
  endDate: string;
  licensedEmployeeCount: number;
  unlicensedEmployeeCount: number;
  deactivatedEmployeeCount: number;
  createdAt: string;
  updatedAt: string;
  purchased: Purchased[];
  employeeLicenses: EmployeeLicense[];
}

interface EmployeeLicense {
  id: number;
  companySubscriptionId: number;
  employeeId: number;
  licenseType: string;
  createdAt: string;
  updatedAt: string;
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
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface Purchased {
  id: number;
  companySubscriptionId: number;
  subscriptionId: number;
  createdAt: string;
  updatedAt: string;
  subscription: Subscription;
}

interface Subscription {
  id: number;
  type: string;
  name: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
