export const settingNavItems = [
  {
    title: "General",
    items: [
      { name: "Company", link: "/settings/company-details" },
      { name: "Domain", link: "/settings/domains" },
      { name: "Rebranding", link: "/settings/rebranding" },
      { name: "From Addresses", link: "/settings/from-addresses" },
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
      { name: "Locations", link: "/settings/from-addresses" },
      { name: "Groups", link: "/settings/groups" },
      { name: "Grades & Levels", link: "/settings/grades" },
      { name: "Grade Categories", link: "/settings/grade_categories" },
      { name: "Qualifications", link: "/settings/qualifications" },
      { name: "Probation Policy", link: "/settings/probation_policy" },
    ],
    category: "basic",
  },
  {
    title: "User Access Control",
    items: [
      { name: "Roles & Permissions", link: "/settings/roles" },
      { name: "Delegation", link: "/settings/delegations" },

      // { name: "Allowed IP's", link: "/settings/rebranding" },
      // { name: "Geo Restrictions", link: "/settings/from-addresses" },
    ],
    category: "basic",
  },

  {
    title: "Automation",
    items: [
      { name: "Workflows", link: "/settings/automation/workflows" },
      // { name: "Actions", link: "/settings/domain" },
      // { name: "Approvals", link: "/settings/rebranding" },
      // { name: "Scheduler", link: "/settings/from-addresses" },
    ],
    category: "basic",
  },
  // {
  //   title: "Data Administration",
  //   items: [
  //     { name: "Import History", link: "/settings/company-details" },
  //     { name: "Export History", link: "/settings/domain" },
  //     { name: "Activity Log", link: "/settings/rebranding" },
  //     { name: "Files Usage", link: "/settings/from-addresses" },
  //     { name: "API Usage", link: "/settings/from-addresses" },
  //   ],
  //   category: "basic",
  // },
  // next category goes here
  {
    title: "Leave",
    items: [
      { name: "Leave requests", link: "/settings/company-details" },
      { name: "Loan requests", link: "/settings/domain" },
      { name: "Activity Log", link: "/settings/rebranding" },
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
