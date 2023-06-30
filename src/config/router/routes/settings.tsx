import Branches from "features/core/branches/pages/Branches";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import GeneralCompanySettings from "features/settings/pages/GeneralCompanySettings";
import CompanyDetails from "features/core/company/pages/CompanyDetails";
import { MyProfile } from "features/core/employees/pages/MyProfile";
import { EmployeeProfile } from "features/core/employees/pages/EmployeeProfile";
import { AddEmployee } from "features/core/employees/pages/AddEmployee";
import Employees from "features/core/employees/pages/Employees";
import Designations from "features/core/designations/pages/Designations";
import Groups from "features/core/groups/pages/Groups";
import Departments from "features/core/departments/pages/Departments";
import Delegations from "features/core/delegations/pages/Delegations";
import Roles from "features/core/roles-and-permissions/pages/Roles";
import CreateRole from "features/core/roles-and-permissions/pages/CreateRole";
import { EditRole } from "features/core/roles-and-permissions/pages/EditRole";
import Workflows from "features/core/workflows/pages/Workflows";
import CreateWorklow from "features/core/workflows/pages/CreateWorkflow";
import EditWorkflow from "features/core/workflows/pages/EditWorkflow";
import Holidays from "features/core/holidays/pages/Holidays";
import ResignationSettingsPage from "features/core/policies/pages/ResignationSettingsPage";
import ProjectsPage from "features/core/projects/pages/ProjectsPage";

export const settingRoutes: TRouteData[] = [
  {
    element: <ProjectsPage />,
    path: appRoutes.projectSettings,
    isSearchable: true,
    title: "Project Management",
  },
  {
    element: <GeneralCompanySettings />,
    path: appRoutes.settings,
    isSearchable: true,
    title: "Settings",
  },
  {
    element: <CompanyDetails />,
    path: appRoutes.companyDetailsSettings,
    isSearchable: true,
    title: "Company Details",
  },
  {
    element: <Branches />,
    path: appRoutes.locationSettings,
    isSearchable: true,
    title: "Locations",
  },
  {
    element: <div />,
    path: appRoutes.singleLocation().format,
    isSearchable: false,
  },
  {
    element: <Holidays />,
    path: appRoutes.holidaySettings,
    isSearchable: true,
    title: "Holidays",
  },

  {
    element: <MyProfile />,
    path: appRoutes.userProfileSettings,
    isSearchable: true,
    title: "User Profile",
  },
  {
    element: <EmployeeProfile />,
    path: appRoutes.singleEmployee().format,
    isSearchable: false,
  },
  {
    element: <AddEmployee />,
    path: appRoutes.addEmployee,
    isSearchable: true,
    title: "Add Employee",
  },
  {
    element: <Employees />,
    path: appRoutes.employeeSettings,
    isSearchable: true,
    title: "Employees",
  },
  {
    element: <Designations />,
    path: appRoutes.designationSettings,
    isSearchable: true,
    title: "Designations",
  },
  {
    element: <div />,
    path: appRoutes.singleDesignation().format,
    isSearchable: false,
  },
  {
    element: <Groups />,
    path: appRoutes.groupSettings,
    isSearchable: true,
    title: "Groups",
  },
  {
    element: <Departments />,
    path: appRoutes.departmentSettings,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.singleDepartment().format,
    isSearchable: false,
  },
  {
    element: <Delegations />,
    path: appRoutes.delegationSettings,
    isSearchable: true,
    title: "Delegations",
  },
  {
    element: <Roles />,
    path: appRoutes.roleSettings,
    isSearchable: true,
    title: "Roles",
  },
  {
    element: <CreateRole />,
    path: appRoutes.createRole,
    isSearchable: true,
    title: "Create Role",
  },
  {
    element: <EditRole />,
    path: appRoutes.editRole().format,
    isSearchable: false,
  },
  {
    element: <Workflows />,
    path: appRoutes.workflowSettings,
    isSearchable: true,
    title: "Workflows",
  },
  {
    element: <CreateWorklow />,
    path: appRoutes.createWorkflow,
    isSearchable: true,
    title: "Create Workflow",
  },
  {
    element: <EditWorkflow />,
    path: appRoutes.editWorkflow().format,
    isSearchable: false,
  },
  {
    element: <ResignationSettingsPage />,
    path: appRoutes.resignationPolicySettings,
    isSearchable: true,
    title: "Resignation Setting",
  },
];
