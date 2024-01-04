import PayrollSubNav from "../components/PayrollSubNav";
import CreatePayrollContainer from "../components/payrollCreations/CreatePayrollContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { TPayrollSchemeType } from "../types/payrollSchemes";

const CreatePayroll: React.FC<{
  scheme: TPayrollSchemeType;
  title?: string;
}> = ({ scheme, title }) => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title={title ?? `Create ${scheme?.split("-").join(" ")} Payroll`}
          link={appRoutes.payrollHome}
        />
        <CreatePayrollContainer type={scheme} />
      </div>
    </>
  );
};

export default CreatePayroll;
