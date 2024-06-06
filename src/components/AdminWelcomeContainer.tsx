import React from "react";
import { useIsAuthenticated } from "react-auth-kit";
import AdminWelcomeComp from "./AdminWelcomeComp";
import { useApiAuth } from "hooks/useApiAuth";

const AdminWelcomeContainer = () => {
  const isAuthenticated = useIsAuthenticated();

  const { currentCompanyEmployeeDetails: employee } = useApiAuth();

  if (!isAuthenticated()) {
    return null;
  }
  if (isAuthenticated() && employee?.isOwner === false) {
    return null;
  }

  return <AdminWelcomeComp />;
};

export default AdminWelcomeContainer;
