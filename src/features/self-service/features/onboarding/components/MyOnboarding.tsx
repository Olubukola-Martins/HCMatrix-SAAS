import React from "react";
import { useGetAuthenticatedEmployeeOnboarding } from "../hooks/useGetAuthenticatedEmployeeOnboarding";
import SingleOnboardingContainer from "./singleOnboarding/SingleOnboardingContainer";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

const MyOnboarding = () => {
  const { data, isFetching, error, isError } =
    useGetAuthenticatedEmployeeOnboarding();
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      message="Oops! Something went wrong"
      action={() => navigate(appRoutes.selfServiceHome)}
    >
      <ErrorWrapper
        isError={isError}
        message={
          error?.response.data.message ?? error?.response.data.error.message
        }
      >
        <SingleOnboardingContainer data={data} loading={isFetching} />
      </ErrorWrapper>
    </ErrorBoundary>
  );
};

export default MyOnboarding;
