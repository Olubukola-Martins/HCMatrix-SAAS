import { Form } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { boxStyle, boxTitle } from "styles/reused";

export const WorkflowSetUp = () => {
    return (
      <div className={boxStyle}>
        <h5 className={`${boxTitle} mb-2`}>Select Workflow</h5>
  
        <Form requiredMark={false} layout="vertical">
          <FormWorkflowInput
            Form={Form}
            control={{ name: "workflowId", label: "" }}
          />
          <div className="flex justify-end">
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </div>
    );
  };