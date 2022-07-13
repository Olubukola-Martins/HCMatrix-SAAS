import React from "react";
import { Route, Routes } from "react-router-dom";
import GeneralSettings from "../Pages/General/GeneralSettings";
import CompanyDetails from "../Pages/General/CompanyDetails";
import FromAddresses from "../Pages/General/FromAddresses";
import Rebranding from "../Pages/General/Rebranding";
import Domains from "../Pages/General/Domains";
import EmployeeProfiles from "../Pages/Organization/EmployeeProfiles";
import UserProfiles from "../Pages/Organization/UserProfiles";
import Locations from "../Pages/Organization/Locations";
import LocationDetail from "../Pages/Organization/LocationDetail";
import PersonalInformation from "../Pages/Organization/PersonalInformation";
import Designations from "../Pages/Organization/Designations";
import DesignationDetail from "../Pages/Organization/DesignationDetail";
import Groups from "../Pages/Organization/Groups";
import Departments from "../Pages/Organization/Departments";
import DepartmentDetail from "../Pages/Organization/DepartmentDetail";
import Delegations from "../Pages/Organization/Delegations";
import DelegationDetail from "../Pages/Organization/DelegationDetail";

const SettingRoutes = () => {
  return (
    <Routes>
      {/* General */}
      <Route path="/settings" element={<GeneralSettings />} />
      <Route path="/settings/company-details" element={<CompanyDetails />} />
      <Route path="/settings/domains" element={<Domains />} />
      <Route path="/settings/rebranding" element={<Rebranding />} />
      <Route path="/settings/from-addresses" element={<FromAddresses />} />
      <Route path="/settings/locations" element={<Locations />} />
      <Route path="/settings/locations/id" element={<LocationDetail />} />
      <Route path="/settings/employee-profile" element={<EmployeeProfiles />} />
      <Route path="/settings/user-profile" element={<UserProfiles />} />
      <Route path="/settings/employee-profile/id" element={<PersonalInformation/>} />

      {/* Organization */}
      <Route path="/settings/employee-profile" element={<EmployeeProfiles />} />
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
    </Routes>
  );
};

export default SettingRoutes;
