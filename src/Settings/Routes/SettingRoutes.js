import React from "react";
import { Route, Routes } from "react-router-dom";
import GeneralSettings from "../Pages/General/GeneralSettings";
import CompanyDetails from "../Pages/General/CompanyDetails";
import FromAddresses from "../Pages/General/FromAddresses";
import Rebranding from "../Pages/General/Rebranding";
import Domains from "../Pages/General/Domains";
import EmployeeProfiles from "../Pages/Organization/EmployeeProfiles";
import UserProfiles from "../Pages/Organization/UserProfiles";
import Designations from "../Pages/Organization/Designations";
import DesignationDetail from "../Pages/Organization/DesignationDetail";
import Groups from "../Pages/Organization/Groups";

const SettingRoutes = () => {
  return (
    <Routes>
      {/* General */}
      <Route path="/settings" element={<GeneralSettings />} />
      <Route path="/settings/company-details" element={<CompanyDetails />} />
      <Route path="/settings/domains" element={<Domains />} />
      <Route path="/settings/rebranding" element={<Rebranding />} />
      <Route path="/settings/from-addresses" element={<FromAddresses />} />

      {/* Organization */}
      <Route path="/settings/employee-profile" element={<EmployeeProfiles />} />
      <Route path="/settings/user-profile" element={<UserProfiles />} />
      <Route path="/settings/designations" element={<Designations />} />
      <Route
        path="/settings/designations/:id"
        element={<DesignationDetail />}
      />
      <Route path="/settings/groups" element={<Groups />} />
      <Route path="/settings/groups/:id" element={<DesignationDetail />} />
    </Routes>
  );
};

export default SettingRoutes;
