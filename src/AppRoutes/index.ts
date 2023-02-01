// These object helps to ensure that the routes in the application are not manually hardcorded and littered everywhere
// rather they are managed by a single file
export const appRoutes = {
  // auth routes
  login: `/login`,
  register: `/register`,
  verify: `/verify`,
  verifyEmployee: `/verify-employee`,
  forgotPassword: `/forgot-password`,
  resetPassword: `/reset-password`,
  invitedEmployee: `/invited-employee-form`,
  //home routes
  home: `/`,
  companyOrganogram: `/company-organogram`,
  //   setting routes
  settings: "/settings",
  companyDetailsSettings: `/settings/company-details`,
  locationSettings: `/settings/locations`,
  singleLocation: (id?: number) => ({
    format: `/settings/locations/:id`,
    path: `/settings/locations/${id}`,
  }),
  holidaySettings: `/settings/holidays`,
  userProfileSettings: `/settings/profile`,
  addEmployee: `/settings/add-employee`,
  employeeSettings: `/settings/employees`,
  designationSettings: `/settings/designations`,
  singleDesignation: (id?: number) => ({
    format: `/settings/designations/:id`,
    path: `/settings/designations/${id}`,
  }),
  groupSettings: `/settings/groups`,
  departmentSettings: `/settings/departments`,
  singleDepartment: (id?: number) => ({
    format: `/settings/departments/:id`,
    path: `/settings/departments/${id}`,
  }),
  singleDelegation: (id?: number) => ({
    format: `/settings/delegations/:id`,
    path: `/settings/delegations/${id}`,
  }),
  delegationSettings: `/settings/delegations`,
};
