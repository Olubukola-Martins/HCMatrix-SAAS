import PayrollSubNav from "../components/PayrollSubNav";
import CreatePayrollContainer from "../components/payrollCreations/CreatePayrollContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

const CreateProjectPayroll = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Create Project Payroll"
          link={appRoutes.payrollSchemes}
        />
        <CreatePayrollContainer type="project" />
      </div>
    </>
  );
};

export default CreateProjectPayroll;
