import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpDailyWagesPayrollContainer } from "../components/payrollSchemes/SetUpDailyWagesPayrollContainer";
import { useParams } from "react-router-dom";

const SetupDailyWagesPayrollSchemePage = () => {
  const params = useParams();
  const schemeId = params.id;
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Daily Wages Payroll Setup"
          link={appRoutes.setupWagesPayrollScheme}
        />
        <SetUpDailyWagesPayrollContainer
          schemeId={schemeId ? +schemeId : undefined}
        />
      </div>
    </>
  );
};

export default SetupDailyWagesPayrollSchemePage;
