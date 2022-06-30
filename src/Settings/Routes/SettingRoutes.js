import React from "react";
import { Route, Routes } from "react-router-dom";
import GeneralSettings from '../Pages/General/GeneralSettings'
import CompanyDetails from '../Pages/General/CompanyDetails'
import FromAddresses from '../Pages/General/FromAddresses'
import Rebranding from '../Pages/General/Rebranding'
import Domains from '../Pages/General/Domains'
import EmployeeProfiles from "../Pages/Organization/EmployeeProfiles";

const SettingRoutes = () => {
  return (
    <Routes>
      <Route path="/settings" element={<GeneralSettings />} />
      <Route path="/settings/company-details" element={<CompanyDetails />} />
      <Route path="/settings/domains" element={<Domains />} />
      <Route path="/settings/rebranding" element={<Rebranding />} />
      <Route path="/settings/from-addresses" element={<FromAddresses />} />
      <Route path="/settings/employee-profile" element={<EmployeeProfiles />} />
    </Routes>
  );
};

export default SettingRoutes;
