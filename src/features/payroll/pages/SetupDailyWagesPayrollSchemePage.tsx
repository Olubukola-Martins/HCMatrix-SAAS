import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpDailyWagesPayrollContainer } from "../components/payrollSchemes/SetUpDailyWagesPayrollContainer";

const SetupDailyWagesPayrollSchemePage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Daily Wages Payroll Setup"
          link={appRoutes.setupWagesPayrollScheme}
        />
        <SetUpDailyWagesPayrollContainer />
      </div>
    </>
  );
};

export default SetupDailyWagesPayrollSchemePage;
