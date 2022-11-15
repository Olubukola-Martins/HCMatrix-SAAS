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
import { AddEmployee } from "../Components/Organization/EmployeeProfiles/AddEmployee";

const SettingRoutes = () => {
  return (
    <Routes>
      {/* General */}
      <Route path="/settings" element={<GeneralSettings />} />
      <Route path="/settings/company-details" element={<CompanyDetails />} />
      <Route path="/settings/domains" element={<Domains />} />
      <Route path="/settings/from-addresses" element={<FromAddresses />} />
      <Route path="/settings/locations" element={<Locations />} />
      <Route path="/settings/locations/:id" element={<LocationDetail />} />
      <Route path="/settings/user-profile" element={<UserProfiles />} />
      <Route path="/settings/holidays" element={<Holidays />} />
      <Route path="/settings/profile" element={<MyProfile />} />
      <Route path="/settings/add-employee" element={<AddEmployee/>} />

      {/* Organization */}
      <Route path="/settings/employees" element={<Employees />} />
      <Route path="/settings/user-profile" element={<UserProfiles />} />
      <Route path="/settings/designations" element={<Designations />} />
      <Route
        path="/settings/designations/:id"
        element={<DesignationDetail />}
      />
      <Route path="/settings/groups" element={<Groups />} />
      {/* not in figma - ask Emma */}
      {/* <Route path="/settings/groups/:id" element={<DesignationDetail />} /> */}

      <Route path="/settings/departments" element={<Departments />} />
      <Route path="/settings/departments/:id" element={<DepartmentDetail />} />

      <Route path="/settings/delegations" element={<Delegations />} />
      <Route path="/settings/delegations/:id" element={<DelegationDetail />} />

      <Route path="/settings/roles" element={<Roles />} />
      <Route path="/settings/roles/create" element={<CreateRole />} />
      <Route path="/settings/automation/workflows" element={<Workflows />} />
      <Route
        path="/settings/automation/workflows/create"
        element={<CreateWorkflow />}
      />

      <Route path="/settings/payroll" element={<PayrollSettings />} />
      <Route path="/settings/grades" element={<Grades />} />
      <Route path="/settings/grade_categories" element={<GradeCategories />} />

      <Route path="/settings/probation_policy" element={<ProbationPolicy />} />
      <Route
        path="/settings/resignation_policy"
        element={<ResignationPolicy />}
      />
    </Routes>
  );
};

export default SettingRoutes;
