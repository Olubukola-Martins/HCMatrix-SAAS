import PayrollSubNav from "../components/PayrollSubNav";
import CreatePayrollContainer from "../components/payrollCreations/CreatePayrollContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

const CreateDirectSalaryPayroll = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Create Direct Salary Payroll"
          link={appRoutes.payrollHome}
        />
        <CreatePayrollContainer type="direct-salary" />
      </div>
    </>
  );
};

export default CreateDirectSalaryPayroll;
