import React from "react";
import { useGetAuthenticatedEmployeeOnboarding } from "../hooks/useGetAuthenticatedEmployeeOnboarding";
import SingleOnboardingContainer from "./singleOnboarding/SingleOnboardingContainer";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";

const MyOnboarding = () => {
  const { data, isFetching } = useGetAuthenticatedEmployeeOnboarding();
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      message="Oops! Something went wrong"
      action={() => navigate(appRoutes.selfServiceHome)}
    >
      <SingleOnboardingContainer data={data} loading={isFetching} />
    </ErrorBoundary>
  );
};

export default MyOnboarding;
