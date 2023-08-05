import PayrollSubNav from "../components/PayrollSubNav";
import CreatePayrollContainer from "../components/payrollCreations/CreatePayrollContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

const CreateWagePayroll = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Create Wages Payroll" link={appRoutes.payrollHome} />
        <CreatePayrollContainer type="wages" />
      </div>
    </>
  );
};

export default CreateWagePayroll;
