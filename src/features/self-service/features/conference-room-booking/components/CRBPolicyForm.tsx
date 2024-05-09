import { Form } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { useCreateOrUpdateWorkflowApprovalSetting } from "features/core/workflows/hooks/useCreateOrUpdateWorkflowApprovalSetting";
import {
  QUERY_KEY_FOR_WORKFLOW_APPROVAL_SETTING,
  useFetchWorkflowApprovalSetting,
} from "features/core/workflows/hooks/useFetchWorkflowApprovalSetting";
import { useApiAuth } from "hooks/useApiAuth";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";

const CRBPolicyForm = () => {
  const queryClient = useQueryClient();
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();

  const { data } = useFetchWorkflowApprovalSetting({
    type: "conference-room",
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        workflowId: data.workflowId,
      });
    }
  }, [data, form]);

  const { mutate, isLoading } = useCreateOrUpdateWorkflowApprovalSetting();

  const handleSubmit = (data: any) => {
    mutate(
      {
        type: "conference-room",
        workflowId: data.workflowId,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEY_FOR_WORKFLOW_APPROVAL_SETTING,
              "conference-room",
            ],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <div className="flex flex-col gap-4 ">
          <FormWorkflowInput
            Form={Form}
            control={{ label: "Workflow", name: "workflowId" }}
          />

          <div className="flex justify-end">
            <Form.Item>
              <AppButton
                label="Save"
                type="submit"
                variant="transparent"
                isLoading={isLoading}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CRBPolicyForm;
