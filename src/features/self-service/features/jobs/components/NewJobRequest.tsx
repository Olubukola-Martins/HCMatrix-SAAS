import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRules,
  numberHasToBeGreaterThanZeroRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_JOB_REQUISITIONS } from "../../requisitions/hooks/job/useGetJobRequisitions";
import { useCreateJobRequisition } from "../../requisitions/hooks/job/useCreateJobRequisition";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { EMPLOYMENT_TYPES } from "constants/general";
import { QUERY_KEY_FOR_JOB_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/job/useGetJobRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "features/notifications/hooks/useGetAlerts";
import { QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT } from "features/notifications/hooks/unRead/useGetUnReadNotificationCount";

export const NewJobRequest: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateJobRequisition();

  const handleSubmit = (data: any) => {
    mutate(
      {
        designationId: data.designationId,
        date: data.date.toString(),
        employmentType: data.employmentType,
        salaryRange: `${data.salaryRange.from} - ${data.salaryRange.to}`,
        educationRequirements: data.educationRequirements,
        skillsAndQualifications: data.skillsAndQualifications,
        preferredStartDate: data.preferredStartDate,
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
            queryKey: [QUERY_KEY_FOR_JOB_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_JOB_REQUISITIONS_FOR_AUTH_EMPLOYEE],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_APPROVAL_REQUESTS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_NOTIFICATIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT],
            // exact: true,
          });
        },
      }
    );
  };
  const [salaryRangeFrom, setSalaryRangeFrom] = useState<number>();
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"New Job Request"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          name="date"
          label="Date"
        >
          <DatePicker placeholder="Date" className="w-full" />
        </Form.Item>
        <FormDesignationInput
          Form={Form}
          control={{ name: "designationId", label: "Designation" }}
        />

        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          name="preferredStartDate"
          label="Preferred Start Date"
        >
          <DatePicker placeholder="Preferred Start Date" className="w-full" />
        </Form.Item>

        <Form.Item
          rules={generalValidationRules}
          name="employmentType"
          label="Employment Type"
        >
          <Select options={EMPLOYMENT_TYPES} placeholder="Employment Type" />
        </Form.Item>
        <Form.Item name="salaryRange" label="Salary Range">
          <Input.Group className="flex gap-4 w-full">
            <Form.Item
              name={["salaryRange", "from"]}
              rules={[numberHasToBeGreaterThanZeroRule]}
              noStyle
            >
              <InputNumber
                placeholder="From"
                className="w-full"
                onChange={(val) => val && setSalaryRangeFrom(+val?.toString())}
              />
            </Form.Item>
            <Form.Item
              name={["salaryRange", "to"]}
              noStyle
              rules={[
                {
                  required: true,

                  validator: async (_: any, value: any) => {
                    if (typeof value !== "number") {
                      throw new Error("Please enter a valid number!");
                    }
                    if (salaryRangeFrom && +value <= salaryRangeFrom) {
                      throw new Error(
                        "Please enter a number greater than From value"
                      );
                    }

                    return true;
                  },
                },
              ]}
            >
              <InputNumber placeholder="To" className="w-full" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="skillsAndQualifications"
          label="Skills And Qualifications"
        >
          <Input.TextArea placeholder="Skills And Qualifications" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="educationRequirements"
          label="Education Requirements"
        >
          <Input placeholder="Education Requirements" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
