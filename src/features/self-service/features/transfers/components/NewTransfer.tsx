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
import { useCreateTranferRequisition } from "../../requisitions/hooks/transfer/useCreateTransferRequisition";
import { FormBranchInput } from "features/core/branches/components/FormBranchInput";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { QUERY_KEY_FOR_TRANSFER_REQUISITIONS } from "../../requisitions/hooks/transfer/useGetTransferRequisitions";

export const NewTransfer: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const { currentUserEmployeeId } = useApiAuth();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateTranferRequisition();

  const handleSubmit = (data: any) => {
    mutate(
      {
        date: data.date.toString(),
        proposedBranchId: data.proposedBranchId,
        proposedDesignationId: data.proposedDesignationId,
        skillsAndQualifications: data.skillsAndQualifications,
        reason: data.reason,
        employeeId: currentUserEmployeeId,
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
            queryKey: [QUERY_KEY_FOR_TRANSFER_REQUISITIONS],
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
      title={"New Transfer"}
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

        <FormBranchInput
          Form={Form}
          control={{ name: "proposedBranchId", label: "Proposed Branch" }}
        />
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
          label="Skills and Qualifications"
        >
          <Input.TextArea placeholder="Skills and Qualifications" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="reason"
          label="Reason"
        >
          <Input.TextArea placeholder="Reason" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
