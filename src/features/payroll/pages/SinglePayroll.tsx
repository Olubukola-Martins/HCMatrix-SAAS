import { useParams } from "react-router-dom";
import PayrollSubNav from "../components/PayrollSubNav";
import CreatePayrollContainer from "../components/payrollCreations/CreatePayrollContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { TPayrollSchemeType } from "../types/payrollSchemes";

const SinglePayroll = () => {
  const params = useParams();
  const scheme = params.scheme;
  const payrollId = params.id as string;
  const schemeName = scheme === "office" ? "Step Pay" : scheme;
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title={`${schemeName} payroll`}
          link={appRoutes.listOfPayrolls}
        />
        <CreatePayrollContainer
          type={scheme as unknown as TPayrollSchemeType}
          payrollId={+payrollId}
        />
      </div>
    </>
  );
};

export default SinglePayroll;
