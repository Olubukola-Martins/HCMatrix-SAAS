import React from "react";
import Statement from "../Pages/Statement";
// import Billings from "../Pages/Billings";
import { Routes, Route } from "react-router-dom";
import BillingHome from "../Pages/BillingHome";
import PurchaseUserLicense from "../Pages/PurchaseUserLicence";
import { RequireAuth } from "react-auth-kit";

const BillingRoutes = () => {
  return (
    <Routes>
      <Route
        path="/statement"
        element={
          <RequireAuth loginPath={"/login"}>
            <Statement />
          </RequireAuth>
        }
      />
      <Route
        path="/billings"
        element={
          <RequireAuth loginPath={"/login"}>
            <BillingHome />
          </RequireAuth>
        }
      />
      <Route
        path="/purchase-user-license"
        element={
          <RequireAuth loginPath={"/login"}>
            <PurchaseUserLicense />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default BillingRoutes;
