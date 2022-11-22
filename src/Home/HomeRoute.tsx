import React from "react";
import { RequireAuth } from "react-auth-kit";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../Layout/Components/NotFound/NotFound";
import CompanyOrganogram from "./Components/CompanyOrganogram";
import Home from "./Pages/Home";

function HomeRoute() {
  return (
    <Routes>
      {/* <Route
        path="/"
        
      > */}
      <Route
        path="/"
        element={
          // <RequireAuth loginPath={"/login"}>
          <Home />
          // </RequireAuth>
        }
      />
      <Route
        path="/company-organogram"
        element={
          // <RequireAuth loginPath={"/login"}>
          <CompanyOrganogram />
          // </RequireAuth>
        }
      />
      {/* </Route> */}
     
    </Routes>
  );
}

export default HomeRoute;
