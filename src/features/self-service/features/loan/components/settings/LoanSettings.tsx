import { WorkflowSetUp } from "./WorkflowSetup";
import BankDetails from "./BankDetails";
import RepaymentPlan from "./repaymentPlans/RepaymentPlan";
import LoanTypeSetup from "./loanTypes/LoanTypeSetup";
import MaxloanPercentSetup from "./MaxloanPercentSetup";

const LoanSettings = () => {
  return (
    <div className="">
      <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
        <div className="flex flex-col gap-4">
          <WorkflowSetUp />

          <BankDetails />

          <RepaymentPlan />
        </div>

        <div className="flex flex-col gap-4">
          <LoanTypeSetup />

          <MaxloanPercentSetup />
        </div>
      </div>
    </div>
  );
};

export default LoanSettings;
