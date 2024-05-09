import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { boxStyle, boxTitle } from "styles/reused";
import { Form } from "antd";

export const WorkflowSetUp: React.FC<{
  Form: typeof Form;
}> = ({ Form }) => {
  return (
    <div className={boxStyle}>
      <h5 className={`${boxTitle} mb-2`}>Select Workflow</h5>

      <FormWorkflowInput
        Form={Form}
        control={{ name: "workflowId", label: "" }}
      />
    </div>
  );
};
