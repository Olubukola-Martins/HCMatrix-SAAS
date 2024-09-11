import { DatePicker, Form, Input, Modal, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IModalProps } from "types";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { useCreateAttendance } from "../hooks/useCreateAttendance";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useContext, useState } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { QUERY_KEY_FOR_TIME_SHEET } from "../hooks/useGetTimeSheet";
import moment from "moment";

export const AddManuelAttendance = ({ open, handleClose }: IModalProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const [empUid, setEmpUid] = useState<string>();
  const { mutate, isLoading } = useCreateAttendance();

  const onSubmit = (values: any) => {
    const date = values.date ? values.date.format("MM/DD/YYYY") : null;
    const [startTime, endTime] = values.time;
    const timeIn = startTime.format("HH:mm:ss");
    const timeOut = endTime.format("HH:mm:ss");

    mutate(
      {
        empUid: empUid as unknown as string,
        timeIn: timeIn,
        timeOut: timeOut,
        date: date,
        comment: values.comment,
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
          });

          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIME_SHEET]);
          form.resetFields();
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
      <p className="text-xs pb-3 text-yellow-500">
        Please note that attendance once created can not be edited or deleted!
      </p>
      <Form layout="vertical" requiredMark="optional" onFinish={onSubmit}>
        <FormEmployeeInput
          Form={Form}
          handleSelect={(_, val) => setEmpUid(val?.empUid)}
        />
        <Form.Item name="time" label="Time" rules={generalValidationRules}>
          <TimePicker.RangePicker
            className="w-full"
            format="HH:mm"
            placeholder={["Time In", "Time Out"]}
          />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={generalValidationRules}>
          <DatePicker
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Add note"
          rules={generalValidationRulesOp}
        >
          <Input.TextArea />
        </Form.Item>
        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
