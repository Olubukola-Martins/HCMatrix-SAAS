import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";
import { DoublePropTwoFA, TAction } from "../types";
import { useDisableTwoFA } from "../hooks/useDisableTwoFA";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_CHECK_OTP } from "../hooks/useGetTwoFA";

export const DisableTwoFA = ({
  open,
  handleClose,
  setAction,
}: DoublePropTwoFA) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { isLoading, mutate } = useDisableTwoFA();

  const handleFormSubmit = (val: any) => {
    mutate(
      {
        code: val.code,
        withRecoveryCode: false,
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
          form.resetFields();
          handleClose();
        },
      }
    );
  };

  return (
    <>
      <Modal
        open={open}
        footer={null}
        onCancel={() => handleClose()}
        title={`Disable Two-Factor Authentication`}
      >
        <div className="text-center pt-5">
          <p>
            To disable 2FA, enter the 6-digit verification code generated by{" "}
            <br className="md:flex hidden" /> your authenticator app below
          </p>

          <Form
            onFinish={handleFormSubmit}
            form={form}
            layout="vertical"
            className="mt-4"
            requiredMark={false}
          >
            <Form.Item name="code" rules={generalValidationRules}>
              <Input.OTP formatter={(str) => str.toUpperCase()} />
            </Form.Item>

            <div className="flex justify-between mt-3">
              <p
                onClick={() => setAction("use-backup-codes")}
                className="text-[#01966B] font-medium cursor-pointer"
              >
                Use a backup code instead
              </p>
              <AppButton label="Disable" type="submit" isLoading={isLoading} />
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
