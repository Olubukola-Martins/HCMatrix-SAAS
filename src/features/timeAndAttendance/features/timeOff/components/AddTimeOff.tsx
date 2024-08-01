import { DatePicker, Form, Modal, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { useCreateTimeOff } from "../hooks/useCreateTimeOff";
import { FormTimeOffPolicyInput } from "../../settings/timeOffPolicy/components/FormTimeOffPolicyInput";
import { QUERY_KEY_FOR_ALL_TIME_OFF_REQUEST } from "../hooks/useGetAllTimeOffRequest";
import { QUERY_KEY_FOR_MY_TIME_OFF_REQUEST } from "../hooks/useGetTimeOff";

export const AddTimeOff = ({ open, handleClose }: IModalProps) => {
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;

  const { mutate, isLoading: isLoadingCreate } = useCreateTimeOff();
  const queryClient = useQueryClient();

  const handleSubmit = (values: any) => {
    mutate(
      {
        policyId: values.policyId,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm:ss"),
        comment: values.comment,
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
            description: res.data.message,
          });
          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_MY_TIME_OFF_REQUEST]);
          queryClient.invalidateQueries([QUERY_KEY_FOR_ALL_TIME_OFF_REQUEST]);
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
      title={"Create Timeoff"}
      style={{ top: 15 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <FormTimeOffPolicyInput
          Form={Form}
          control={{ label: "Time off policy", name: "policyId" }}
        />
        <Form.Item
          name="time"
          label="Time"
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
        >
          <TimePicker className="w-full" />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={generalValidationRules}>
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Comment"
          rules={textInputValidationRulesOp}
        >
          <TextArea />
        </Form.Item>
        <AppButton type="submit" isLoading={isLoadingCreate} />
      </Form>
    </Modal>
  );
};
