import Branches from "features/core/branches/pages/Branches";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const settingRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.settings,
    isSearchable: true,
    title: "Settings",
  },
  {
    element: <div />,
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
    element: <div />,
    path: appRoutes.holidaySettings,
    isSearchable: true,
    title: "Holidays",
  },
  {
    element: <div />,
    path: appRoutes.userProfileSettings,
    isSearchable: true,
    title: "User Profile",
  },
  {
    element: <div />,
    path: appRoutes.singleEmployee().format,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.addEmployee,
    isSearchable: true,
    title: "Add Employee",
  },
  {
    element: <div />,
    path: appRoutes.employeeSettings,
    isSearchable: true,
    title: "Employees",
  },
  {
    element: <div />,
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
    element: <div />,
    path: appRoutes.groupSettings,
    isSearchable: true,
    title: "Groups",
  },
  {
    element: <div />,
    path: appRoutes.singleDepartment().format,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.delegationSettings,
    isSearchable: true,
    title: "Delegations",
  },
  {
    element: <div />,
    path: appRoutes.roleSettings,
    isSearchable: true,
    title: "Roles",
  },
  {
    element: <div />,
    path: appRoutes.createRole,
    isSearchable: true,
    title: "Create Role",
  },
  {
    element: <div />,
    path: appRoutes.editRole().format,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.workflowSettings,
    isSearchable: true,
    title: "Workflows",
  },
  {
    element: <div />,
    path: appRoutes.createWorkflow,
    isSearchable: true,
    title: "Create Workflow",
  },
  {
    element: <div />,
    path: appRoutes.editWorkflow().format,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.resignationPolicySettings,
    isSearchable: true,
    title: "Resignation Policy",
  },
];
