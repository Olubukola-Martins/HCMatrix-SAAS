import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpMonthlyWagesPayrollContainer } from "../components/payrollSchemes/SetUpMonthlyWagesPayrollContainer";
import { useParams } from "react-router-dom";

const SetupMonthlyWagesPayrollSchemePage = () => {
  const params = useParams();
  const schemeId = params.id;
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Monthly Wages Payroll Setup"
          link={appRoutes.setupWagesPayrollScheme}
        />
        <SetUpMonthlyWagesPayrollContainer
          schemeId={schemeId ? +schemeId : undefined}
        />
      </div>
    </>
  );
};

export default SetupMonthlyWagesPayrollSchemePage;
