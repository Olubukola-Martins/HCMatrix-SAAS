import { Form, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import LiveClock from "components/clock/LiveClock";
import { FormProjectInput } from "features/core/projects/components/FormProjectInput";
import { useGetFormattedDate } from "hooks/useGetFormattedDate";
import { useContext } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { IModalProps } from "types";
import { textInputValidationRulesOpt } from "utils/formHelpers/validation";
import { useSwitchActivity } from "../hooks/useSwitchActivity";
import { openNotification } from "utils/notifications";

export const SwitchActivity = ({ handleClose, open }: IModalProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const [form] = Form.useForm();
  const { formattedDate } = useGetFormattedDate();
  const { mutate, isLoading } = useSwitchActivity();

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
          form.resetFields();
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      title="Switch Activity"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        requiredMark="optional"
        form={form}
        onFinish={onSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="w-full bg-gray-100 py-1 px-2 rounded border">
            <LiveClock format="hh:mm:ss A" />
          </div>
          <div className="w-full bg-gray-100 py-1 px-2 rounded border">
            {formattedDate}
          </div>
        </div>
        <FormProjectInput Form={Form} />
        <Form.Item
          name="comment"
          label="Reason"
          rules={textInputValidationRulesOpt}
        >
          <TextArea />
        </Form.Item>
        <AppButton label="Submit" type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
