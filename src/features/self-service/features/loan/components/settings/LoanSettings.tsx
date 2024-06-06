import { WorkflowSetUp } from "./WorkflowSetup";
import RepaymentPlan from "./repaymentPlans/RepaymentPlan";
import LoanTypeSetup from "./loanTypes/LoanTypeSetup";
import MaxloanPercentSetup from "./MaxloanPercentSetup";
import SelectLoanCostCentre from "./SelectLoanCostCentre";
import { EmployeeApplicationConfiguration } from "./EmployeeApplicationConfiguration";
import { FormInstance, Form } from "antd";

const LoanSettings: React.FC<{
  Form: typeof Form;
  form: FormInstance<any>;
  handleSubmit: (data: any) => void;
}> = ({ Form, form, handleSubmit }) => {
  return (
    <Form requiredMark={false} onFinish={handleSubmit} form={form}>
      <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
        <div className="flex flex-col gap-4">
          <WorkflowSetUp Form={Form} />

          <RepaymentPlan />
          <LoanTypeSetup />
        </div>

        <div className="flex flex-col gap-4">
          <SelectLoanCostCentre Form={Form} />
          <MaxloanPercentSetup Form={Form} />
          <EmployeeApplicationConfiguration Form={Form} />
        </div>
      </div>
    </Form>
  );
};

export default LoanSettings;
