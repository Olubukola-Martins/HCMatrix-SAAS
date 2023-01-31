import { appRoutes } from "AppRoutes";
import React from "react";
import { RequireAuth } from "react-auth-kit";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../Layout/Components/NotFound/NotFound";
import CompanyOrganogram from "./Components/CompanyOrganogram";
import Home from "./Pages/Home";

function HomeRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/company-organogram"
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <CompanyOrganogram />
          </RequireAuth>
        }
      />
      {/* </Route> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default HomeRoute;
