import React from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import UserFeedbackComp from "./UserFeedbackComp";
import { useApiAuth } from "hooks/useApiAuth";

const UserFeedbackContainer = () => {
  const isAuthenticated = useIsAuthenticated();

  const { currentCompanyEmployeeDetails: employee } = useApiAuth();

  if (!isAuthenticated()) {
    return null;
  }
  if (isAuthenticated() && employee?.isOwner === false) {
    return null;
  }

  return <UserFeedbackComp />;
};

export default UserFeedbackContainer;
