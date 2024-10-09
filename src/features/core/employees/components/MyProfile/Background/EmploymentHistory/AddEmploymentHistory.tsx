import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  dateHasToBeLesserThanOrEqualToCurrentDayRuleForRange,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { useAddEmployeeEmploymentHistory } from "features/core/employees/hooks/employmentHistory/useAddEmployeeEmploymentHistory";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

interface IProps extends IModalProps {
  employeeId: number;
}

export const AddEmploymentHistory: React.FC<IProps> = ({
  open,
  handleClose,
  employeeId,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddEmployeeEmploymentHistory();

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId,
        data: {
          endDate: data.duration[1].toString(),
          startDate: data.duration[0].toString(),
          organization: data.organization,
          position: data.position,
        },
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
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add Employment History"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="organization"
          label="Organization"
          rules={textInputValidationRules}
        >
          <Input className="w-full" placeholder="Enter Organization" />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={textInputValidationRules}
        >
          <Input className="w-full" placeholder="Enter Position" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[dateHasToBeLesserThanOrEqualToCurrentDayRuleForRange]}
        >
          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            format={DEFAULT_DATE_FORMAT}
            className="w-full"
          />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
