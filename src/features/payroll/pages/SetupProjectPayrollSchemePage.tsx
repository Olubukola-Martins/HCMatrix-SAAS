import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import SetUpProjectPayrollContainer from "../components/payrollSchemes/SetUpProjectPayrollContainer";

const SetupProjectPayrollSchemePage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Project Payroll Setup"
          link={appRoutes.payrollSchemes}
        />
        <SetUpProjectPayrollContainer />
      </div>
    </>
  );
};

export default SetupProjectPayrollSchemePage;
