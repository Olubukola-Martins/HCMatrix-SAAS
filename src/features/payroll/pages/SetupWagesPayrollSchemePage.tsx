import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpWagesPayrollContainer } from "../components/payrollSchemes/SetUpWagesPayrollContainer";

const SetupWagesPayrollSchemePage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Wages Payroll Setup"
          link={appRoutes.payrollSchemes}
        />
        <SetUpWagesPayrollContainer />
      </div>
    </>
  );
};

export default SetupWagesPayrollSchemePage;
