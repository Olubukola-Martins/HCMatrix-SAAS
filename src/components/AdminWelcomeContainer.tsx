import React from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import AdminWelcomeComp from "./AdminWelcomeComp";

const AdminWelcomeContainer = () => {
  const isAuthenticated = useIsAuthenticated();

  const auth = useAuthUser();

  const authDetails = auth();

  const user = authDetails?.user;

  if (!isAuthenticated()) {
    return null;
  }
  if (isAuthenticated() && user.isOwner === false) {
    return null;
  }

  return <AdminWelcomeComp />;
};

export default AdminWelcomeContainer;
