import { DatePicker, Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_JOB_REQUISITIONS } from "../../requisitions/hooks/job/useGetJobRequisitions";
import { useCreateJobRequisition } from "../../requisitions/hooks/job/useCreateJobRequisition";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { EMPLOYMENT_TYPES } from "constants/general";

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
        salaryRange: data.salaryRange,
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
        },
      }
    );
  };
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
        <FormDesignationInput
          Form={Form}
          control={{ name: "designationId", label: "Designation" }}
        />
        <Form.Item rules={generalValidationRules} name="date" label="Date">
          <DatePicker placeholder="Date" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="preferredStartDate"
          label="Preferred Start Date"
        >
          <DatePicker placeholder="Preferred Start Date" className="w-full" />
        </Form.Item>

        <Form.Item
          rules={textInputValidationRules}
          name="employmentType"
          label="Employment Type"
        >
          <Select options={EMPLOYMENT_TYPES} placeholder="Employment Type" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="salaryRange"
          label="Salary Range"
        >
          <Input placeholder="Salary Range (Nfrom - Nto)" />
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
