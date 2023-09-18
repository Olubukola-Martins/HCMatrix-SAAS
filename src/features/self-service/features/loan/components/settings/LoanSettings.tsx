import { WorkflowSetUp } from "./WorkflowSetup";
import RepaymentPlan from "./repaymentPlans/RepaymentPlan";
import LoanTypeSetup from "./loanTypes/LoanTypeSetup";
import MaxloanPercentSetup from "./MaxloanPercentSetup";
import SelectLoanCostCentre from "./SelectLoanCostCentre";
import { EmployeeApplicationConfiguration } from "./EmployeeApplicationConfiguration";

const LoanSettings = () => {
  return (
    <div className="">
      <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
        <div className="flex flex-col gap-4">
          <WorkflowSetUp />

          <SelectLoanCostCentre />

          <RepaymentPlan />
        </div>

        <div className="flex flex-col gap-4">
          <LoanTypeSetup />

          <MaxloanPercentSetup />
          <EmployeeApplicationConfiguration />
        </div>
      </div>
    </div>
  );
};

export default LoanSettings;
