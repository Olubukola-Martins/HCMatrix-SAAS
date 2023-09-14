import PayrollSubNav from "../components/PayrollSubNav";

import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";
import CompanyBankDetails from "../components/payrollSetting/CompanyBankDetails";
import SelectPayslipTemplate from "../components/payrollSetting/SelectPayslipTemplate";
import LoanConfiguration from "../components/payrollSetting/LoanConfiguration";

const PayrollSetting = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-2">
        <PageIntro title="Payroll Setting" link={appRoutes.payrollHome} />
        <PageSubHeader
          description={"Configure your payroll setting"}
          hideBackground
        />
        <PayslipContainer />
      </div>
    </>
  );
};

const PayslipContainer = () => {
  return (
    <>
      <div className="">
        <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
          <div className="flex flex-col gap-4">
            <CompanyBankDetails />
            <LoanConfiguration />
          </div>

          <div className="flex flex-col gap-4">
            <SelectPayslipTemplate />
          </div>
        </div>
      </div>
    </>
  );
};

export default PayrollSetting;
