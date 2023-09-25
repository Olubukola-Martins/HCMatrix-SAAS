import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpDirectSalaryPayrollContainer } from "../components/payrollSchemes/SetUpDirectSalaryPayrollContainer";

const SetupDirectSalaryPayrollSchemePage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Direct Salary Payroll Setup"
          link={appRoutes.payrollSchemes}
        />
        <SetUpDirectSalaryPayrollContainer />
      </div>
    </>
  );
};

export default SetupDirectSalaryPayrollSchemePage;
