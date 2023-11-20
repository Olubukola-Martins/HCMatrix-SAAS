import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleEmployeeHealthAccess } from "../hooks/employee/useGetSingleEmployeeHealthAccess";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import { Skeleton } from "antd";
import SingleEmployeeHealthAccess from "../components/employee/single-employee/SingleEmployeeHealthAccess";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";

const EmployeeHealthAccessPage = () => {
  const params = useParams();
  const employeeId = params.id as string;
  const { data, isLoading, isError, error } = useGetSingleEmployeeHealthAccess({
    id: Number(employeeId),
  });
  return (
    <>
      <SelfServiceSubNav />
      <ErrorBoundary>
        <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
          <ErrorWrapper
            isError={isError}
            message={
              error?.response.data.message ?? error?.response.data.error.message
            }
          >
            <div className="Container">
              <SingleEmployeeHealthAccess data={data} />
            </div>
          </ErrorWrapper>
        </Skeleton>
      </ErrorBoundary>
    </>
  );
};

export default EmployeeHealthAccessPage;
