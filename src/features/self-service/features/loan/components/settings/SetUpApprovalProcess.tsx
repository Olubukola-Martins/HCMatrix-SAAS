import { Form } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";

export const SetUpApprovalProcess = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Form layout="vertical" requiredMark={false}>
        <FormWorkflowInput
          Form={Form}
          control={{
            label: "Select a workflow for the approval process",
            name: "",
          }}
        />

        <AppButton type="submit" label="Save Changes" />
      </Form>
    </>
  );
};
