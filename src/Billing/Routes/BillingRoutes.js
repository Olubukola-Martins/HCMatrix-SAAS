import React from "react";
import { Route, Routes } from "react-router-dom";
import Statement from "../Pages/Statement";
import Billings from "../Pages/Billings";

const BillingRoutes = () => {
  return (
    <Routes>
      <Route path="/statement" element={<Statement />} />
      <Route path="/billings" element={<Billings />} />
    </Routes>
  );
};

export default BillingRoutes;
