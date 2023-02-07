import { Route, Routes } from "react-router-dom";
import GeneralSettings from "../Pages/General/GeneralSettings";
import CompanyDetails from "../Pages/General/CompanyDetails";
// import FromAddresses from "../Pages/General/FromAddresses";
// import Domains from "../Pages/General/Domains";
import Locations from "../Pages/Organization/Branches/Branches";
import LocationDetail from "../Pages/Organization/Branches/BranchDetail";
import Designations from "../Pages/Organization/Designations/Designations";
import DesignationDetail from "../Pages/Organization/Designations/DesignationDetail";
import Groups from "../Pages/Organization/Groups/Groups";
import Departments from "../Pages/Organization/Departments/Departments";
import DepartmentDetail from "../Pages/Organization/Departments/DepartmentDetail";
import Delegations from "../Pages/Organization/Delegations/Delegations";
import DelegationDetail from "../Pages/Organization/Delegations/DelegationDetail";
import Grades from "../Pages/Organization/Grades/Grades";
import ProbationPolicy from "../Pages/Organization/ProbationPolicy/ProbationPolicy";
import GradeCategories from "../Pages/Organization/GradeCategories/GradeCategories";
import Roles from "../Pages/UserAccessControl/Roles/Roles";
import CreateRole from "../Pages/UserAccessControl/Roles/CreateRole";
import Workflows from "../Pages/UserAccessControl/Automation/Workflows/Workflows";
import CreateWorkflow from "../Pages/UserAccessControl/Automation/Workflows/CreateWorkflow";
import PayrollSettings from "../Pages/Payroll/PayrollSettings";
import Holidays from "../Pages/General/Holidays";
import ResignationPolicy from "../Pages/Policies/ResignationPolicy";
import Employees from "../Pages/Organization/EmployeeProfiles/Employees";
import { MyProfile } from "../Pages/Organization/EmployeeProfiles/MyProfile";
import { RequireAuth } from "react-auth-kit";
import { AddEmployee } from "../Components/Organization/EmployeeProfiles/AddEmployee";
import { appRoutes } from "AppRoutes";
import { EmployeeProfile } from "Settings/Pages/Organization/EmployeeProfiles/EmployeeProfile";

const SettingRoutes = () => {
  return (
    <Routes>
      {/* General */}
      <Route
        path={appRoutes.settings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <GeneralSettings />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.companyDetailsSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <CompanyDetails />
          </RequireAuth>
        }
      />
      {/* <Route
        path="/settings/domains"
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Domains />
          </RequireAuth>
        }
      /> */}
      {/* <Route
        path="/settings/from-addresses"
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <FromAddresses />
          </RequireAuth>
        }
      /> */}
      <Route
        path={appRoutes.locationSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Locations />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.singleLocation().format}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <LocationDetail />
          </RequireAuth>
        }
      />

      <Route
        path={appRoutes.holidaySettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Holidays />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.userProfileSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <MyProfile />
          </RequireAuth>
        }
      />
      {/* QUICK FIX */}
      <Route
        path={appRoutes.singleEmployee().format}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <EmployeeProfile />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.addEmployee}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <AddEmployee />
          </RequireAuth>
        }
      />

      {/* Organization */}
      <Route
        path={appRoutes.employeeSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Employees />
          </RequireAuth>
        }
      />

      <Route
        path={appRoutes.designationSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Designations />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.singleDesignation().format}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <DesignationDetail />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.groupSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Groups />
          </RequireAuth>
        }
      />
      {/* not in figma - ask Emma */}
      {/* <Route path="/settings/groups/:id" element={ <RequireAuth loginPath={appRoutes.login}><DesignationDetail   /></RequireAuth>
        }
      /> */}

      <Route
        path={appRoutes.departmentSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Departments />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.singleDepartment().format}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <DepartmentDetail />
          </RequireAuth>
        }
      />

      <Route
        path={appRoutes.delegationSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Delegations />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.singleDelegation().format}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <DelegationDetail />
          </RequireAuth>
        }
      />

      <Route
        path={appRoutes.roleSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Roles />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.createRole}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <CreateRole />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.workflowSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Workflows />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.createWorkflow}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <CreateWorkflow />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.payrollSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <PayrollSettings />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.payGradeSettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Grades />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.gradeCategorySettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <GradeCategories />
          </RequireAuth>
        }
      />

      <Route
        path={appRoutes.payrollPolicySettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <ProbationPolicy />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.resignationPolicySettings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <ResignationPolicy />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default SettingRoutes;
