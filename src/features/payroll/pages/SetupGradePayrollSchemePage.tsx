import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpGradePayrollContainer } from "../components/payrollSchemes/SetUpGradePayrollContainer";

const SetupGradePayrollSchemePage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Step PayPayroll Setup"
          link={appRoutes.payrollSchemes}
        />
        <SetUpGradePayrollContainer />
      </div>
    </>
  );
};

export default SetupGradePayrollSchemePage;
