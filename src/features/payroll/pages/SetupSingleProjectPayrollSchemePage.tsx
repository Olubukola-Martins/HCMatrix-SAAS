import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpSingleProjectPayrollContainer } from "../components/payrollSchemes/SetUpSingleProjectPayrollContainer";

const SetupSingleProjectPayrollSchemePage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="HCMatrix v3 Project Payroll Setup"
          link={appRoutes.setupProjectPayrollScheme}
        />
        <SetUpSingleProjectPayrollContainer />
      </div>
    </>
  );
};

export default SetupSingleProjectPayrollSchemePage;
