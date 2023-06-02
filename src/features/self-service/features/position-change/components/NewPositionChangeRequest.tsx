import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { useCreatePositionChangeRequisition } from "../../requisitions/hooks/position-change/useCreatePositionChangeRequisition";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS } from "../../requisitions/hooks/position-change/useGetPositionChangeRequisitions";

export const NewPositionChangeRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();
  const { currentUserEmployeeId } = useApiAuth();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreatePositionChangeRequisition();

  const handleSubmit = (data: any) => {
    mutate(
      {
        date: data.date.toString(),
        proposedDesignationId: data.proposedDesignationId,
        employeeId: currentUserEmployeeId,
        skillsAndQualifications: data.skillsAndQualifications,
        reason: data.reason,
        justification: data.justification,
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
            queryKey: [QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS],
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
      title={"New Position Change Request"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={generalValidationRules} name="date" label="Date">
          <DatePicker placeholder="Date" className="w-full" />
        </Form.Item>
        <FormDesignationInput
          Form={Form}
          control={{
            name: "proposedDesignationId",
            label: "Proposed Designation",
          }}
        />
        <Form.Item
          rules={textInputValidationRules}
          name="skillsAndQualifications"
          label="Skills And Qualifications"
        >
          <Input placeholder="Skills And Qualifications" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="reason"
          label="reason"
        >
          <Input.TextArea placeholder="reason" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="justification"
          label="justification"
        >
          <Input.TextArea placeholder="justification" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
