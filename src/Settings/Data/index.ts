export type TLink = {
  name: string;
  link: string;
};

export interface ISettNavItem {
  title: string;
  items: TLink[];
  category: string;
}

export const settingNavItems: ISettNavItem[] = [
  {
    title: "General",
    items: [
      { name: "Company", link: "/settings/company-details" },
      // { name: "Domain", link: "/settings/domains" },
      // { name: "From Addresses", link: "/settings/from-addresses" },
      { name: "Holidays", link: "/settings/holidays" },
    ],
    category: "basic",
  },

  {
    title: "Organization",
    items: [
      { name: "Employees", link: "/settings/employees" },
      { name: "Departments", link: "/settings/departments" },
      { name: "Designations", link: "/settings/designations" },
      { name: "Branches", link: "/settings/locations" },
      { name: "Groups", link: "/settings/groups" },
      { name: "Pay Grades", link: "/settings/grades" },
      { name: "Grade Categories", link: "/settings/grade_categories" },
    ],
    category: "basic",
  },
  {
    title: "User Access Control",
    items: [
      { name: "Roles & Permissions", link: "/settings/roles" },
      { name: "Delegation", link: "/settings/delegations" },
    ],
    category: "basic",
  },

  {
    title: "Automation",
    items: [{ name: "Workflows", link: "/settings/automation/workflows" }],
    category: "basic",
  },
  {
    title: "Policies",
    items: [
      { name: "Probation Policy", link: "/settings/probation_policy" },
      { name: "Resignation Policy", link: "/settings/resignation_policy" },
    ],
    category: "basic",
  },
  {
    title: "Payroll Settings",
    items: [{ name: "Settings", link: "/settings/payroll" }],
    category: "payroll",
  },

  {
    title: "Leave",
    items: [
      { name: "Leave requests", link: "/settings/company-details" },
      { name: "Loan requests", link: "/settings/domain" },
      { name: "Files Usage", link: "/settings/from-addresses" },
    ],
    category: "self-service",
  },
];

export const industries = [
  {
    value: "Food and Beverages",
    label: "Food and Beverages",
  },
  {
    value: "Agriculture",
    label: "Agriculture",
  },
  {
    value: "Sports",
    label: "Sports",
  },
];
export const countries = [
  {
    value: "Nigeria",
    label: "Nigeria",
  },
  {
    value: "Cameroon",
    label: "Cameroon",
  },
  {
    value: "Isreal",
    label: "Isreal",
  },
];
