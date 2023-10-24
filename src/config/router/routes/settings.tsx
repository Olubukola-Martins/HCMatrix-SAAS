import Branches from "features/core/branches/pages/Branches";
import { appRoutes } from "../paths";
import { TAppPageDataFnProps, TRouteData } from "../types";
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
import SingleProjectPage from "features/core/projects/pages/SingleProjectPage";
import { canUserAccessComponent } from "components/permission-restriction/PermissionRestrictor";
import ProbationSettingsPage from "features/core/policies/pages/ProbationSettingsPage";

export const settingRoutes = (props: TAppPageDataFnProps): TRouteData[] => {
  const { userPermissions } = props;
  return [
    {
      element: <ProjectsPage />,
      path: appRoutes.projectSettings,
      isSearchable: true,
      title: "Project Management",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-projects"],
      }),
    },
    {
      element: <SingleProjectPage />,
      path: appRoutes.singleProject().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-projects"],
      }),
    },
    {
      element: <GeneralCompanySettings />,
      path: appRoutes.settings,
      isSearchable: true,
      title: "Settings",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-company-settings"],
      }),
    },

    {
      element: <CompanyDetails />,
      path: appRoutes.companyDetailsSettings,
      isSearchable: true,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-company-settings"],
      }),
      title: "Company Details",
    },

    {
      element: <Branches />,
      path: appRoutes.locationSettings,
      isSearchable: true,
      title: "Branches",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-branches"],
      }),
    },

    {
      element: <Holidays />,
      path: appRoutes.holidaySettings,
      isSearchable: true,
      title: "Holidays",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-holidays"],
      }),
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
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-employees"],
      }),
    },
    {
      element: <AddEmployee />,
      path: appRoutes.addEmployee,
      isSearchable: true,
      title: "Add Employee",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-employees"],
      }),
    },
    {
      element: <Employees />,
      path: appRoutes.employeeSettings,
      isSearchable: true,
      title: "Employees",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-employees"],
      }),
    },
    {
      element: <Designations />,
      path: appRoutes.designationSettings,
      isSearchable: true,
      title: "Designations",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-designations"],
      }),
    },

    {
      element: <Groups />,
      path: appRoutes.groupSettings,
      isSearchable: true,
      title: "Groups",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-groups"],
      }),
    },
    {
      element: <Departments />,
      path: appRoutes.departmentSettings,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-departments"],
      }),
    },

    {
      element: <Delegations />,
      path: appRoutes.delegationSettings,
      isSearchable: true,

      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["create-delegations", "view-all-delegations"],
      }),
      title: "Delegations",
    },
    {
      element: <Roles />,
      path: appRoutes.roleSettings,
      isSearchable: true,
      title: "Roles",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-roles"],
      }),
    },
    {
      element: <CreateRole />,
      path: appRoutes.createRole,
      isSearchable: true,
      title: "Create Role",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-roles"],
      }),
    },
    {
      element: <EditRole />,
      path: appRoutes.editRole().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-roles"],
      }),
    },
    {
      element: <Workflows />,
      path: appRoutes.workflowSettings,
      isSearchable: true,
      title: "Workflows",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-workflows"],
      }),
    },
    {
      element: <CreateWorklow />,
      path: appRoutes.createWorkflow,
      isSearchable: true,
      title: "Create Workflow",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-workflows"],
      }),
    },
    {
      element: <EditWorkflow />,
      path: appRoutes.editWorkflow().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-workflows"],
      }),
    },
    {
      element: <ResignationSettingsPage />,
      path: appRoutes.resignationPolicySettings,
      isSearchable: true,
      title: "Resignation Setting",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-resignation"],
      }),
    },
    {
      element: <ProbationSettingsPage />,
      path: appRoutes.probationPolicySettings,
      isSearchable: true,
      title: "Probation Setting",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-probation"],
      }),
    },
  ];
};
