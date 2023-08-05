import PayrollSubNav from "../components/PayrollSubNav";
import CreatePayrollContainer from "../components/payrollCreations/CreatePayrollContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

const CreateOfficePayroll = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Create Office Payroll" link={appRoutes.payrollHome} />
        <CreatePayrollContainer type="office" />
      </div>
    </>
  );
};

export default CreateOfficePayroll;
