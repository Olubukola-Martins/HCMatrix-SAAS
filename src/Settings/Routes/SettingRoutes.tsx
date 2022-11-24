import { Route, Routes } from "react-router-dom";
import GeneralSettings from "../Pages/General/GeneralSettings";
import CompanyDetails from "../Pages/General/CompanyDetails";
import FromAddresses from "../Pages/General/FromAddresses";
import Domains from "../Pages/General/Domains";
import UserProfiles from "../Pages/Organization/UserProfiles/UserProfiles";
import Locations from "../Pages/Organization/Locations/Locations";
import LocationDetail from "../Pages/Organization/Locations/LocationDetail";
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

const SettingRoutes = () => {
  return (
    <Routes>
      {/* General */}
      <Route
        path="/settings"
        element={
          // <RequireAuth loginPath={"/login"}>
          <GeneralSettings />
          // </RequireAuth>
        }
      />
      <Route
        path="/settings/company-details"
        element={
          <RequireAuth loginPath={"/login"}>
            <CompanyDetails />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/domains"
        element={
          // <RequireAuth loginPath={"/login"}>
            <Domains />
          // </RequireAuth>
        }
      />
      <Route
        path="/settings/from-addresses"
        element={
          <RequireAuth loginPath={"/login"}>
            <FromAddresses />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/locations"
        element={
          <RequireAuth loginPath={"/login"}>
            <Locations />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/locations/:id"
        element={
          <RequireAuth loginPath={"/login"}>
            <LocationDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/user-profile"
        element={
          <RequireAuth loginPath={"/login"}>
            <UserProfiles />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/holidays"
        element={
          <RequireAuth loginPath={"/login"}>
            <Holidays />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/profile"
        element={
          <RequireAuth loginPath={"/login"}>
            <MyProfile />
          </RequireAuth>
        }
      />

      {/* Organization */}
      <Route
        path="/settings/employees"
        element={
          <RequireAuth loginPath={"/login"}>
            <Employees />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/user-profile"
        element={
          <RequireAuth loginPath={"/login"}>
            <UserProfiles />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/designations"
        element={
          <RequireAuth loginPath={"/login"}>
            <Designations />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/designations/:id"
        element={
          <RequireAuth loginPath={"/login"}>
            <DesignationDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/groups"
        element={
          <RequireAuth loginPath={"/login"}>
            <Groups />
          </RequireAuth>
        }
      />
      {/* not in figma - ask Emma */}
      {/* <Route path="/settings/groups/:id" element={ <RequireAuth loginPath={"/login"}><DesignationDetail   /></RequireAuth>
        }
      /> */}

      <Route
        path="/settings/departments"
        element={
          // <RequireAuth loginPath={"/login"}>
            <Departments />
          // </RequireAuth>
        }
      />
      <Route
        path="/settings/departments/:id"
        element={
          // <RequireAuth loginPath={"/login"}>
            <DepartmentDetail />
          // </RequireAuth>
        }
      />

      <Route
        path="/settings/delegations"
        element={
          <RequireAuth loginPath={"/login"}>
            <Delegations />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/delegations/:id"
        element={
          <RequireAuth loginPath={"/login"}>
            <DelegationDetail />
          </RequireAuth>
        }
      />

      <Route
        path="/settings/roles"
        element={
          <RequireAuth loginPath={"/login"}>
            <Roles />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/roles/create"
        element={
          <RequireAuth loginPath={"/login"}>
            <CreateRole />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/automation/workflows"
        element={
          <RequireAuth loginPath={"/login"}>
            <Workflows />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/automation/workflows/create"
        element={
          <RequireAuth loginPath={"/login"}>
            <CreateWorkflow />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/payroll"
        element={
          <RequireAuth loginPath={"/login"}>
            <PayrollSettings />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/grades"
        element={
          <RequireAuth loginPath={"/login"}>
            <Grades />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/grade_categories"
        element={
          <RequireAuth loginPath={"/login"}>
            <GradeCategories />
          </RequireAuth>
        }
      />

      <Route
        path="/settings/probation_policy"
        element={
          <RequireAuth loginPath={"/login"}>
            <ProbationPolicy />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/resignation_policy"
        element={
          <RequireAuth loginPath={"/login"}>
            <ResignationPolicy />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default SettingRoutes;
