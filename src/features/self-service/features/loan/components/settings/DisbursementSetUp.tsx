import { Form, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useCreateDisbursementSetUp } from "../../hooks/setting/disbursementSetUp/useCreateDisbursementSetUp";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { QUERY_KEY_FOR_GET_APPROVAL_PROCESS, useGetApprovalProcess } from "../../hooks/setting/approvalProcess/useGetApprovalProcess";
import { openNotification } from "utils/notifications";
import { useGetDisbursementSetUp } from "../../hooks/setting/disbursementSetUp/useGetDisbursementSetUp";

export const DisbursementSetUp = () => {
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading: createLoading } = useCreateDisbursementSetUp();
  const { data, isLoading, isSuccess } = useGetDisbursementSetUp();
  
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
    <div>
      <h3 className="font-medium pb-5">Disbursement Setup</h3>

      <Form onFinish={onSubmit} form={form} disabled={isLoading} requiredMark={false} >
        <div className="flex items-center justify-between mb-7">
          <h5 className="font-medium">Set Payment Plan</h5>
          <Form.Item
            name="enableDisbursement"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </div>

        <AppButton type="submit" label="Save Settings" isLoading={createLoading}/>
      </Form>
    </div>
  );
};
