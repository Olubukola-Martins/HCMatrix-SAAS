import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { useDisableTwoFA } from "../hooks/useDisableTwoFA";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_CHECK_OTP } from "../hooks/useGetTwoFA";

export const EnterBackupCodes = ({ open, handleClose }: IModalProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { isLoading, mutate } = useDisableTwoFA();

  const handleFormSubmit = (val: any) => {
    mutate(
      {
        code: val.code,
        withRecoveryCode: true,
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
        onSuccess: (res) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_CHECK_OTP],
          });
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`Enter Backup Code`}
    >
      <div className="text-center pt-5">
        <p>
          Enter backup code to disable 2FA on your account. Each backup
          <br className="md:flex hidden" /> code can only be used once.
        </p>

        <Form
          onFinish={handleFormSubmit}
          form={form}
          layout="vertical"
          className="mt-6"
          requiredMark={false}
          
        >
          <Form.Item name="code" rules={textInputValidationRules}>
            <Input />
          </Form.Item>

          <div className="flex justify-end">
            <AppButton label="Continue" type="submit" isLoading={isLoading} />
          </div>
        </Form>
      </div>
    </Modal>
  );
};
