import React from "react";
import Statement from "../Pages/Statement";
import Billings from "../Pages/Billings";
import { Routes, Route } from "react-router-dom";

const BillingRoutes = () => {
  return (
    <Routes>
      <Route path="/statement" element={<Statement />} />
      {/* <Route path="/billings" element={<Billings />} /> */}
      
    </Routes>
  );
};

export default BillingRoutes;
