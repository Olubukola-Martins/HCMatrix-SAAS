import PageSubHeader from "components/layout/PageSubHeader";
import { Tabs } from "antd";

import { PayrollReportTemplateList } from "./templates/PayrollReportTemplateList";
import PayrollReportTable from "./PayrollReportTable";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import AddPayrollReport from "./AddPayrollReport";

type TAction = "create-report";

export const PayrollReportAndTempsContainer = () => {
  const tabItems = [
    {
      key: "Templates",
      label: "Templates",
      children: <PayrollReportTemplateList />,
    },
    {
      key: "Reports",
      label: "Reports",
      children: <PayrollReportTable />,
    },
  ];
  const navigate = useNavigate();
  const [action, setAction] = useState<TAction>();
  return (
    <>
      <AddPayrollReport
        open={action === "create-report"}
        handleClose={() => setAction(undefined)}
      />
      <div className="flex flex-col gap-6">
        <PageSubHeader
          description={`You can now manage payroll reports and their parent templates.`}
          actions={[
            {
              name: "New Template",
              handleClick: () =>
                navigate(appRoutes.createPayrollReportTemplate),
            },
            {
              name: "Create Report",
              handleClick: () => {
                setAction("create-report");
              },
            },
          ]}
        />
        <Tabs items={tabItems} />
      </div>
    </>
  );
};
