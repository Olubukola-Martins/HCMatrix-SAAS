import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";

import { Skeleton } from "antd";
import PayslipTemplate from "../components/payslips/templates/PayslipTemplate";

const ViewPayslipTemplate = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-4">
        {/* TODO: Fetch the template name from api and also pass the template to templateComp */}
        <Skeleton loading={false} active paragraph={{ rows: 9 }}>
          <PageIntro
            title="Payroll Report Template"
            link={appRoutes.payrollReport}
          />
          <PageSubHeader
            hideBackground
            description={`You can now view this _ template`}
          />
          {/* TODO: Style select boxes that are disabled to be grayed out */}
          <PayslipTemplate
            template={[{ name: "TEST TEMPLATE", description: "___" }]}
            disabled
          />
        </Skeleton>
      </div>
    </>
  );
};

export default ViewPayslipTemplate;
