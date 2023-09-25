import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";

import { Skeleton } from "antd";
import PayslipTemplate from "../components/payslips/templates/PayslipTemplate";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import { useParams } from "react-router-dom";
import { useGetSinglePayrollTemplate } from "../hooks/templates/useGetSinglePayrollTemplate";

const ViewPayslipTemplate = () => {
  const params = useParams();
  const entityId: number = +(params.id as unknown as string);

  const { data, isFetching, isError } = useGetSinglePayrollTemplate({
    templateId: entityId,
    type: "payslip",
  });
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-4">
        {/* TODO: Fetch the template name from api and also pass the template to templateComp */}
        <Skeleton loading={isFetching} active paragraph={{ rows: 9 }}>
          <ErrorWrapper
            message="Payroll Template not found"
            isError={isError}
            backLink={appRoutes.payrollReport}
          >
            <>
              {" "}
              <PageIntro
                title={`${data?.name} payroll template`}
                link={appRoutes.payslips}
              />
              <PageSubHeader
                hideBackground
                description={`You can now view this  template`}
              />
              {/* TODO: Style select boxes that are disabled to be grayed out */}
              {data && <PayslipTemplate template={{ ...data }} disabled />}
            </>
          </ErrorWrapper>
        </Skeleton>
      </div>
    </>
  );
};

export default ViewPayslipTemplate;
