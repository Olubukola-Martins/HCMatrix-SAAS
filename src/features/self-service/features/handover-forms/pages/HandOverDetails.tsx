import {  Skeleton } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { useParams } from "react-router-dom";
import EmployeeHandOverContainer from "../components/EmployeeHandOverContainer";
import { useGetSingleExitHandOverForm } from "../hooks/useGetSingleExitHandOverForm";
import { useApiAuth } from "hooks/useApiAuth";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { truncateString } from "utils/dataHelpers/truncateString";

const HandOverDetails = () => {
  const { id } = useParams();
  const { token, companyId } = useApiAuth();
  const { data, isLoading, isError, error } = useGetSingleExitHandOverForm({
    companyId,
    token,
    id: +(id as unknown as string),
  });

  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <ErrorBoundary>
          <Skeleton active loading={isLoading} paragraph={{ rows: 35 }}>
            <ErrorWrapper
              isError={isError}
              backLink={appRoutes.handOver}
              message={
                error?.response.data.message ??
                error?.response.data.error.message
              }
            >
              <PageIntro
                title={truncateString(
                  `${getEmployeeFullName(data?.employee)}'s Handover Form`,
                  20
                )}
                link={appRoutes.handOver}
              />
              <EmployeeHandOverContainer
                handover={data}
                isLoading={isLoading}
                
              />
            </ErrorWrapper>
          </Skeleton>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default HandOverDetails;
