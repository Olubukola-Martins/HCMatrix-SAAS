import React from "react";
import SingleEmployeeHealthAccess from "./single-employee/SingleEmployeeHealthAccess";
import { useGetAuthenticatedEmployeeHealthAccess } from "../../hooks/employee/useGetAuthenticatedEmployeeHealthAccess";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

const AuthEmployeeHealthAccess = () => {
  const { data, isLoading, isError, error } =
    useGetAuthenticatedEmployeeHealthAccess();
  return (
    <ErrorBoundary>
      <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
        <ErrorWrapper
          isError={isError}
          message={
            error?.response.data.message ?? error?.response.data.error.message
          }
        >
          <SingleEmployeeHealthAccess data={data} />
        </ErrorWrapper>
      </Skeleton>
    </ErrorBoundary>
  );
};

export default AuthEmployeeHealthAccess;
