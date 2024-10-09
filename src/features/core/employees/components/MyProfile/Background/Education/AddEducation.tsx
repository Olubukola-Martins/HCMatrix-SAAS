import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  dateHasToBeLesserThanOrEqualToCurrentDayRuleForRange,
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";

import { useAddEmployeeEducation } from "features/core/employees/hooks/educationDetail/useAddEmployeeEducation";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

interface IProps extends IModalProps {
  employeeId: number;
}

export const AddEducation: React.FC<IProps> = ({
  open,
  handleClose,
  employeeId,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddEmployeeEducation();

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId,
        data: {
          endDate: data.duration[1].format("YYYY/MM/DD"),
          specialization: data.specialization,
          degree: data.degree,
          school: data.school,
          startDate: data.duration[0].format("YYYY/MM/DD"),
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
      title={"Add Education"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="school"
          label="School"
          rules={textInputValidationRules}
        >
          <Input className="w-full" placeholder="Enter School" />
        </Form.Item>
        <Form.Item
          name="degree"
          label="Degree"
          rules={textInputValidationRules}
        >
          <Input className="w-full" placeholder="Enter Degree" />
        </Form.Item>
        <Form.Item
          name="specialization"
          label="Specialization"
          rules={textInputValidationRules}
        >
          <Input className="w-full" placeholder="Enter Specialization" />
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
