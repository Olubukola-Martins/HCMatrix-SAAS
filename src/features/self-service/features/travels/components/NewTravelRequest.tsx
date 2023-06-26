import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  generalValidationRulesOp,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { EMPLOYMENT_TYPES, PRIORITIES } from "constants/general";
import { useCreateTravelRequisition } from "../../requisitions/hooks/travel/useCreateTravelRequisition";
import { useApiAuth } from "hooks/useApiAuth";
import { QUERY_KEY_FOR_TRAVEL_REQUESTS } from "../../requisitions/hooks/travel/useGetTravelRequisitions";

export const NewTravelRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateTravelRequisition();
  const { currentUserEmployeeId } = useApiAuth();

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId: currentUserEmployeeId,
        arrivalDate: data.arrivalDate.toString(),
        cost: data.cost,
        duration: data.duration,
        location: data.location,
        reason: data.reason,
        departureDate: data.departureDate.toString(),
        priority: data.priority,
        clientName: data.clientName,
        billableToClient: !!data.billableToClient,
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
            queryKey: [QUERY_KEY_FOR_TRAVEL_REQUESTS],
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
      title={"New Travel Request"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={generalValidationRules}
          name="departureDate"
          label="Departure Date"
        >
          <DatePicker placeholder="Departure Date" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="arrivalDate"
          label="Arrival Date"
        >
          <DatePicker placeholder="Arrival Date" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="duration"
          label="Duration (days)"
        >
          <InputNumber placeholder="Duration" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRulesOp}
          name="priority"
          label="Priority"
        >
          <Select options={PRIORITIES} placeholder="Priority" />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="cost" label="Cost">
          <InputNumber placeholder="Cost" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="clientName"
          label="Client Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="location"
          label="Location"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="reason"
          label="Reason"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          rules={generalValidationRulesOp}
          name="billableToClient"
          label="Billable To Client"
        >
          <Switch unCheckedChildren="No" checkedChildren="Yes" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
