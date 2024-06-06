import PayrollSubNav from "../components/PayrollSubNav";
import { PageIntro } from "components/layout/PageIntro";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";

import { PayslipTemplateList } from "../components/payslips/templates/PayslipTemplateList";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

export const PayrollPayslip = () => {
  const navigate = useNavigate();
  const { userPermissions } = useGetUserPermissions();

  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-2">
        <PageIntro title="Payslips & Templates" link={appRoutes.payrollHome} />
        <PageSubHeader
          description={
            "You can manage payslip templates and view employee payslips"
          }
          actions={[
            {
              name: "Create Template",
              handleClick: () => navigate(appRoutes.createPayslipTemplate),
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: ["manage-payslip-templates"],
              }),
            },
            {
              name: "View Payslips",
              btnVariant: "transparent",
              handleClick: () => navigate(appRoutes.employeePayslips),
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: ["view-all-payslips"],
              }),
            },
          ]}
        />
        <PayslipContainer
          canViewPayslipTemplates={canUserAccessComponent({
            userPermissions,
            requiredPermissions: ["view-payslip-templates"],
          })}
        />
      </div>
    </>
  );
};

const PayslipContainer: React.FC<{ canViewPayslipTemplates: boolean }> = ({
  canViewPayslipTemplates,
}) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        {canViewPayslipTemplates && <PayslipTemplateList />}
      </div>
    </>
  );
};
