import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { useApiAuth } from "hooks/useApiAuth";
import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import PayslipTransactionContainer from "features/payroll/components/payslips/PayslipTransactionContainer";

const PayslipsTransactionsPage = () => {
  const { currentUserEmployeeId } = useApiAuth();
  const {
    data: employee,
    isFetching,
    isError,
  } = useFetchSingleEmployee({
    employeeId: currentUserEmployeeId,
  });
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro
          title="My Payslips & Transactions"
          link={appRoutes.payslips}
        />
        <Skeleton loading={isFetching}>
          <ErrorWrapper backLink={appRoutes.selfServiceHome} isError={isError}>
            {employee ? (
              <PayslipTransactionContainer
                employeePayrollType={employee?.jobInformation?.payrollType}
              />
            ) : null}
          </ErrorWrapper>
        </Skeleton>
      </div>
    </>
  );
};

export default PayslipsTransactionsPage;
