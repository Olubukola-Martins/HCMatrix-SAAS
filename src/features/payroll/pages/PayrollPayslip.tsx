import PayrollSubNav from "../components/PayrollSubNav";

import { AppButton } from "components/button/AppButton";
import { PageIntro } from "components/layout/PageIntro";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";

import { PayslipTemplateList } from "../components/payslips/templates/PayslipTemplateList";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

export const PayrollPayslip = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-2">
        <PageIntro title="Payslips & Templates" link={appRoutes.payrollHome} />
        <PageSubHeader
          description={
            "You can manage payslip templates and view employee payslips"
          }
          hideBackground
        />
        <PayslipContainer />
      </div>
    </>
  );
};

const PayslipContainer = () => {
  const { userPermissions } = useGetUserPermissions();
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-end gap-3">
          {canUserAccessComponent({
            userPermissions,
            requiredPermissions: ["manage-payslip-templates"],
          }) && (
            <Link to={appRoutes.createPayslipTemplate}>
              <AppButton label="Create template" />
            </Link>
          )}
          {canUserAccessComponent({
            userPermissions,
            requiredPermissions: ["view-all-payslips"],
          }) && (
            <Link to={appRoutes.employeePayslips}>
              <AppButton label="View Payslips" variant="transparent" />
            </Link>
          )}
        </div>
        {canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["view-payslip-templates"],
        }) && <PayslipTemplateList />}
      </div>
    </>
  );
};
