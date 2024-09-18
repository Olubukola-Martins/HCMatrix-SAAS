export type TPermissionLabel =
  | "create-sister-company"
  | "manage-company-settings"
  | "transfer-company-ownership"
  | "manage-holidays"
  | "manage-projects"
  | "manage-employees"
  | "manage-departments"
  | "manage-designations"
  | "manage-branches"
  | "manage-groups"
  | "manage-roles"
  | "create-delegations"
  | "view-all-delegations"
  | "manage-workflows"
  | "manage-resignation"
  | "manage-probation"
  | "manage-employee-onboarding"
  | "manage-vehicle-settings"
  | "manage-vehicles"
  | "view-vehicle-overview"
  | "view-all-vehicle-bookings"
  | "manage-conference-room-settings"
  | "manage-conference-room"
  | "view-all-conference-room-bookings"
  | "manage-documents"
  | "manage-loan-settings"
  | "view-all-loan-requests"
  | "view-all-loan-repayments"
  | "manage-leave-settings"
  | "view-all-leave-requests"
  | "recall-leave"
  | "view-all-leave-recalls"
  | "manage-requsition-settings"
  | "manage-assets"
  | "view-asset-overview"
  | "view-all-asset-requests"
  | "view-all-job-requests"
  | "view-all-monetary-requests"
  | "view-all-position-change-requests"
  | "view-all-promotion-requests"
  | "view-all-reimbursement-requests"
  | "view-all-transfer-requests"
  | "view-all-travel-requests"
  | "view-all-exit-handover-forms"
  | "view-payroll-dashboard"
  | "manage-payroll-settings"
  | "manage-exchange-rates"
  | "manage-cost-centres"
  | "manage-payroll-schemes"
  | "manage-tax-authorities"
  | "manage-pension-authorities"
  | "manage-nsitf-authorities"
  | "manage-itf-authorities"
  | "manage-pay-grades-and-categories"
  | "manage-payroll-report-templates"
  | "view-payroll-report-templates"
  | "manage-payroll-reports"
  | "view-payroll-reports"
  | "manage-payslip-templates"
  | "view-payslip-templates"
  | "view-all-payslips"
  | "create-payroll"
  | "run-payroll"
  | "rollback-payroll"
  | "delete-payroll"
  | "view-all-payrolls"
  | "compare-payrolls"
  | "manage-hmo-plans"
  | "manage-hospital-categories"
  | "manage-hospitals"
  | "manage-employee-health-access"
  | "manage-unlicensed-employees"
  | "manage-time-and-attendance-settings" //time & attendance permissions begin here
  | "view-time-and-attendance-reports"
  | "view-all-swap-shift-requests"
  | "view-all-time-off-requests"
  | "upload-time-and-attendance-timesheet"
  | "view-all-time-and-attendance-timesheet"
  | "view-time-and-attendance-dashboard-summary"
  | "view-all-profile-edit-requests"; //profile-edit

export type TPermissionInDelegation = {
  id: number;
  permissionId: number;
  delegationId: number;
  createdAt: string;
  updatedAt: string;
  permission: TPermission;
};

export type TPermission = {
  id: number;
  name: string;
  label: TPermissionLabel;
  categoryId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};
export type TPermissionCategory = {
  id: number;
  name: string;

  description?: string;
};

export type TRole = {
  id: number;
  name: string;
  userCount: number;
  createdAt: string;
  updatedAt: string;
  label?: string;
  permissions?: {
    id: number;
    permissionId: number;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    permission: TPermission;
  }[];
};
