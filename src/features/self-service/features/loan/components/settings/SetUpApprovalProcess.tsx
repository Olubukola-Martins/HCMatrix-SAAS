import { Form } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { useCreateApprovalProcess } from "../../hooks/setting/approvalProcess/useCreateApprovalProcess";
import { openNotification } from "utils/notifications";
import { useContext, useEffect } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import {
  QUERY_KEY_FOR_GET_APPROVAL_PROCESS,
  useGetApprovalProcess,
} from "../../hooks/setting/approvalProcess/useGetApprovalProcess";

export const SetUpApprovalProcess = () => {
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading: createLoading } = useCreateApprovalProcess();
  const { data, isLoading, isSuccess } = useGetApprovalProcess();

  useEffect(() => {
    if (isSuccess && data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data, isSuccess, form]);

  const onSubmit = (values: any) => {
    mutate(
      {
        ...values,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
            duration: 4,
          });
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_GET_APPROVAL_PROCESS]);
        },
      }
    );
  };

  return (
    <>
      <Form
        form={form}
        disabled={isLoading}
        layout="vertical"
        requiredMark={false}
        onFinish={onSubmit}
      >
        <FormWorkflowInput
          Form={Form}
          control={{
            label: "Select a workflow for the approval process",
            name: "workflowId",
          }}
        />

        <AppButton
          type="submit"
          label="Save Changes"
          isLoading={createLoading}
        />
      </Form>
    </>
  );
};
