import React from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import UserFeedbackComp from "./UserFeedbackComp";

const UserFeedbackContainer = () => {
  const isAuthenticated = useIsAuthenticated();

  const auth = useAuthUser();

  const authDetails = auth();

  const user = authDetails?.user;

  if (!isAuthenticated()) {
    return null;
  }
  if (isAuthenticated() && user.isAdmin === false) {
    return null;
  }

  return <UserFeedbackComp />;
};

export default UserFeedbackContainer;
