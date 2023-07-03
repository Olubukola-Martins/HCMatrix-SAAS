import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpMonthlyWagesPayrollContainer } from "../components/payrollSchemes/SetUpMonthlyWagesPayrollContainer";

const SetupMonthlyWagesPayrollSchemePage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Monthly Wages Payroll Setup"
          link={appRoutes.setupWagesPayrollScheme}
        />
        <SetUpMonthlyWagesPayrollContainer />
      </div>
    </>
  );
};

export default SetupMonthlyWagesPayrollSchemePage;
