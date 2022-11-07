import React from "react";
import Statement from "../Pages/Statement";
// import Billings from "../Pages/Billings";
import { Routes, Route } from "react-router-dom";
import BillingHome from "../Pages/BillingHome";
import PurchaseUserLicense from "../Pages/PurchaseUserLicence";

const BillingRoutes = () => {
  return (
    <Routes>
      <Route path="/statement" element={<Statement />} />
      <Route path="/billings" element={<BillingHome />} />
      <Route path="/purchase-user-license" element={<PurchaseUserLicense />} />
    </Routes>
  );
};

export default BillingRoutes;
