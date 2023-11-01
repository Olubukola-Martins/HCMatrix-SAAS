import PageSubHeader from "components/layout/PageSubHeader";
import { Tabs } from "antd";

import { PayrollReportTemplateList } from "./templates/PayrollReportTemplateList";
import PayrollReportTable from "./PayrollReportTable";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import AddPayrollReport from "./AddPayrollReport";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

type TAction = "create-report";

export const PayrollReportAndTempsContainer = () => {
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "Templates",
      label: "Templates",
      children: <PayrollReportTemplateList />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-payroll-report-templates"],
      }),
    },
    {
      key: "Reports",
      label: "Reports",
      children: <PayrollReportTable />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-payroll-reports"],
      }),
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
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: ["manage-payroll-report-templates"],
              }),
            },
            {
              name: "Create Report",
              handleClick: () => {
                setAction("create-report");
              },
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: ["manage-payroll-reports"],
              }),
            },
          ]}
        />
        <Tabs items={tabItems.filter((item) => item.hidden === false)} />
      </div>
    </>
  );
};
