export const settingNavItems = [
  {
    title: "General",
    items: [
      { name: "Company", link: "/settings/company-details" },
      { name: "Domain", link: "/settings/domains" },
      { name: "From Addresses", link: "/settings/from-addresses" },
      { name: "Holidays", link: "/settings/holidays" },
    ],
    category: "basic",
  },

  {
    title: "Organization",
    items: [
      { name: "Users", link: "/settings/user-profile" },
      { name: "Employee profiles", link: "/settings/employee-profile" },
      { name: "Departments", link: "/settings/departments" },
      { name: "Designations", link: "/settings/designations" },
      { name: "Locations", link: "/settings/locations" },
      { name: "Groups", link: "/settings/groups" },
      { name: "Pay Grades", link: "/settings/grades" },
      { name: "Grade Categories", link: "/settings/grade_categories" },
      { name: "Probation Policy", link: "/settings/probation_policy" },
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
