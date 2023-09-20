import { DatePicker, Form, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { useGetTimeOffPolicy } from "../hooks/useGetTimeOffPolicy";
import { useCreateTimeOff } from "../hooks/useCreateTimeOff";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useContext } from "react";

export const AddTimeOff = ({ open, handleClose }: IModalProps) => {
  const { companyId, token, currentUserId } = useApiAuth();
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { data, isLoading: loadPolicy } = useGetTimeOffPolicy();
  const { mutate, isLoading } = useCreateTimeOff();
  const handleSubmit = (values: any) => {
    mutate(
      {
        reason: values.reason,
        date: values.date.format(),
        timeOffPolicyId: values.policy,
        userId: currentUserId,
        companyId,
        token,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 6.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: "Time off Successfully created",
          });

          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          // queryClient.invalidateQueries([QUERY_KEY_FOR_BIOMETRIC_DEVICE]);
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add New"
      style={{ top: 15 }}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="policy"
          label="Time off policy"
          rules={generalValidationRules}
        >
          <Select
            allowClear
            loading={loadPolicy}
            placeholder="Select"
            options={data?.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={generalValidationRules}>
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason"
          requiredMark="optional"
          rules={textInputValidationRulesOp}
        >
          <TextArea />
        </Form.Item>
        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
