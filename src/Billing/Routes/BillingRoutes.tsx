import React from "react";
import Statement from "../Pages/Statement";
// import Billings from "../Pages/Billings";
import { Routes, Route } from "react-router-dom";
import BillingHome from "../Pages/BillingHome";
import PurchaseUserLicense from "../Pages/PurchaseUserLicence";
import { RequireAuth } from "react-auth-kit";
import { appRoutes } from "AppRoutes";

const BillingRoutes = () => {
  return (
    <Routes>
      <Route
        path={appRoutes.billingStatement}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Statement />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.billings}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <BillingHome />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.purchaseUserLicense}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <PurchaseUserLicense />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default BillingRoutes;
