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
      { name: "Pay Grades", link: "/settings/grades" },
      { name: "Grade Categories", link: "/settings/grade_categories" },
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
  {
    title: "Payroll Settings",
    items: [{ name: "Settings", link: appRoutes.payrollSettings }],
    category: "payroll",
  },

  {
    title: "Leave",
    items: [
      { name: "Leave Policy", link: appRoutes.leaveSettings },
      { name: "Loan requests", link: "/settings/domain" },
      { name: "Files Usage", link: "/settings/from-addresses" },
    ],
    category: "self-service",
  },
];
