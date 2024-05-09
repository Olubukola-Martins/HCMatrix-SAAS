export type TSubscriptionType = "module" | "plan";
export type TSubscriptionLabel =
  | "employee-management"
  | "hr-admin"
  | "payroll"
  | "time-and-attendance"
  | "performance"
  | "recruitment"
  | "learning-and-development";

// TODO: add more/update the TSubscriptionResourceLabel when fleshed out by team properly
export type TSubscriptionResourceLabel =
  | "onboarding"
  | "position-change-requisition"
  | "promotion-requisition"
  | "transfer-requisition"
  | "handover-form"
  | "documents"
  | "basic-workflow"
  | "health-access"
  | "company-organogram"
  | "asset-management"
  | "vehicle-booking"
  | "conference-room-booking"
  | "job-requisition"
  | "reimbursement-requisition"
  | "disciplinary"
  | "task-management"
  | "advanced-workflow"
  | "leave"
  | "payroll-analytics"
  | "tax-configuration"
  | "allowances-and-deductions"
  | "office-payroll"
  | "direct-salary-payroll"
  | "project-payroll"
  | "wages-payroll"
  | "payroll-disbursement";

export type TSubscription = {
  id: number;
  type: TSubscriptionType;
  name: string;
  label: TSubscriptionLabel;
  description: string;
  createdAt: string;
  updatedAt: string;
  prices: Price[];
  iconUrl?: string | null;
  resources: Resource2[];
};

interface Resource2 {
  id: number;
  subscriptionId: number;
  resourceId: number;
  createdAt: string;
  updatedAt: string;
  resource: Resource;
}

interface Resource {
  id: number;
  name: string;
  label: TSubscriptionResourceLabel;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Price {
  id: number;
  subscriptionId: number;
  type: string;
  monthlyPricePerLicensedEmployee: string;
  monthlyPricePerUnlicensedEmployee: string;
  yearlyPricePerLicensedEmployee: string;
  yearlyPricePerUnlicensedEmployee: string;
  createdAt: string;
  updatedAt: string;
}
