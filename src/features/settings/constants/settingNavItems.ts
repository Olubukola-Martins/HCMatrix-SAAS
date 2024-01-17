import { appRoutes } from "config/router/paths";

export type TLink = {
  name: string;
  link: string;
};

export type TSettNavItem = {
  title: string;
  items: TLink[];
  category: string;
};

export const settingNavItems: TSettNavItem[] = [
  {
    title: "General",
    items: [
      { name: "Company", link: appRoutes.companyDetailsSettings },
      // { name: "Domain", link: "/settings/domains" },
      // { name: "From Addresses", link: "/settings/from-addresses" },
      { name: "Holidays", link: appRoutes.holidaySettings },
      { name: "Projects", link: appRoutes.projectSettings }, //when merged update this
    ],
    category: "basic",
  },

  {
    title: "Organization",
    items: [
      { name: "Employees", link: appRoutes.employeeSettings },
      { name: "Departments", link: appRoutes.departmentSettings },
      { name: "Designations", link: appRoutes.designationSettings },
      { name: "Branches", link: appRoutes.locationSettings },
      { name: "Groups", link: appRoutes.groupSettings },
    ],
    category: "basic",
  },
  {
    title: "User Access Control",
    items: [
      { name: "Roles & Permissions", link: appRoutes.roleSettings },
      { name: "Delegation", link: appRoutes.delegationSettings },
    ],
    category: "basic",
  },

  {
    title: "Automation",
    items: [{ name: "Workflows", link: appRoutes.workflowSettings }],
    category: "basic",
  },
  {
    title: "Policies",
    items: [
      { name: "Probation Policy", link: appRoutes.probationPolicySettings },
      { name: "Resignation Policy", link: appRoutes.resignationPolicySettings },
    ],
    category: "basic",
  },
  // payroll
  {
    title: "General",
    items: [
      { name: "Cost Centres", link: appRoutes.payrollCostCentres },
      { name: "Exchange Rates", link: appRoutes.payrollExchangeRates },
      {
        name: "Pay Grade & Categories",
        link: appRoutes.payGradeAndCategorySettings,
      },
      { name: "Settings", link: appRoutes.payrollSettings },
    ],
    category: "payroll",
  },

  {
    title: "Schemes",
    items: [
      { name: "Step Pay Scheme", link: appRoutes.setupGradePayrollScheme },
      {
        name: "Direct Salary Scheme",
        link: appRoutes.setupDirectSalaryPayrollScheme,
      },
      { name: "Project Scheme", link: appRoutes.setupProjectPayrollScheme },
      { name: "Wages Scheme", link: appRoutes.setupWagesPayrollScheme },
    ],
    category: "payroll",
  },
  {
    title: "Tax",
    items: [
      { name: "Authorities", link: "" },
      { name: "Policies", link: appRoutes.payrollTaxPolicies },
    ],
    category: "payroll",
  },
  {
    title: "Pension",
    items: [{ name: "Administrators", link: "" }],
    category: "payroll",
  },
  {
    title: "Templates",
    items: [
      { name: "Payslips", link: appRoutes.createPayslipTemplate },
      { name: "Reports", link: appRoutes.payrollReport },
    ],
    category: "payroll",
  },
  // self service
  {
    title: "Onboarding",
    items: [{ name: "Onboarding", link: appRoutes.onboarding }],
    category: "self-service",
  },
  {
    title: "Vehicle",
    items: [{ name: "Booking", link: appRoutes.vehicleBooking }],
    category: "self-service",
  },
  {
    title: "Conference Rooms",
    items: [
      {
        name: "Conference Rooms",
        link: appRoutes.conferenceRoomBookingSetting,
      },
    ],
    category: "self-service",
  },
  {
    title: "Documents",
    items: [
      {
        name: "Files & Folders",
        link: appRoutes.documents,
      },
    ],
    category: "self-service",
  },
  {
    title: "Health Access",
    items: [
      {
        name: "Configuration",
        link: appRoutes.healthAccessSettings,
      },
    ],
    category: "self-service",
  },
  {
    title: "Payslips",
    items: [
      {
        name: "Create Template",
        link: appRoutes.createPayslipTemplate,
      },
      {
        name: "Payslip Templates",
        link: appRoutes.payslips,
      },
      {
        name: "User Payslips",
        link: appRoutes.employeePayslips,
      },
    ],
    category: "self-service",
  },
  {
    title: "Loan",
    items: [
      { name: "Policies", link: appRoutes.loanPolicies },
      { name: "Home", link: appRoutes.loans },
    ],
    category: "self-service",
  },
  {
    title: "Leave",
    items: [
      { name: "Types & Policy", link: appRoutes.leaveSettings },
      { name: "Home", link: appRoutes.leaveHome },
    ],
    category: "self-service",
  },
  {
    title: "Requisition",
    items: [
      { name: "Asset", link: appRoutes.selfServiceAssetSetting },
      { name: "Job", link: appRoutes.selfServiceJobSetting },
      { name: "Money", link: appRoutes.selfServiceMonetarySetting },
      {
        name: "Position Change",
        link: appRoutes.selfServicePositionChangeSetting,
      },
      { name: "Promotion", link: appRoutes.selfServicePromotionSetting },
      {
        name: "Reimbursement",
        link: appRoutes.selfServiceReimbursementSetting,
      },
      { name: "Transfer", link: appRoutes.selfServiceTransferSetting },
      { name: "Travel", link: appRoutes.selfServiceTravelSetting },
      { name: "Settings", link: appRoutes.selfServiceRequisition },
    ],
    category: "self-service",
  },

  {
    title: "General",
    items: [
      { name: "Time Tracking Rules", link: appRoutes.timeTrackingRules },
      {
        name: "Create Work Schedule",
        link: appRoutes.workSchedule,
      },
      { name: "Time Off Policy", link: appRoutes.timeOffPolicy },
      { name: "Clock in settings", link: appRoutes.clockInSettings },
      { name: "Location", link: appRoutes.location },
      { name: "Other Settings", link: appRoutes.otherSettings },
    ],
    category: "attendance",
  },

  {
    title: "General",
    items: [
      { name: "Training", link: appRoutes.trainingSettings },

      { name: "Gamification", link: appRoutes.gamificationSettings },

      { name: "Notification", link: appRoutes.notification },
      {
        name: "Feedback Template",
        link: appRoutes.feedbackTemplate,
      },
    ],
    category: "leaning",
  },
];
