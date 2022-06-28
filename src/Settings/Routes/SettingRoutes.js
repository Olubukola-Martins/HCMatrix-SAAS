import React from "react";
import { Route, Routes } from "react-router-dom";
import GeneralSettings from '../Pages/GeneralSettings'
import CompanyDetails from '../Pages/CompanyDetails'
import FromAddresses from '../Pages/FromAddresses'
import Rebranding from '../Pages/Rebranding'
import Domains from '../Pages/Domains'

const SettingRoutes = () => {
  return (
    <Routes>
      <Route path="/settings" element={<GeneralSettings />} />
      <Route path="/settings/company-details" element={<CompanyDetails />} />
      <Route path="/settings/domains" element={<Domains />} />
      <Route path="/settings/rebranding" element={<Rebranding />} />
      <Route path="/settings/from-addresses" element={<FromAddresses />} />
    </Routes>
  );
};

export default SettingRoutes;
