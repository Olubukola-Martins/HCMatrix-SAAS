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
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRulesOp,
  numberHasToBeGreaterThanZeroRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { PRIORITIES } from "constants/general";
import { useCreateTravelRequisition } from "../../requisitions/hooks/travel/useCreateTravelRequisition";
import { QUERY_KEY_FOR_TRAVEL_REQUESTS } from "../../requisitions/hooks/travel/useGetTravelRequisitions";
import moment, { Moment } from "moment";
import { QUERY_KEY_FOR_TRAVEL_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/travel/useGetTravelRequisitions4AuthEmployee";

export const NewTravelRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateTravelRequisition();
  const [arrivalDate, setArrivalDate] = useState<Moment | null>(null);
  const [departureDate, setDepartureDate] = useState<Moment | null>(null);
  const handleSubmit = (data: any) => {
    mutate(
      {
        arrivalDate: (data.arrivalDate as Moment).toString(),
        cost: data.cost,
        duration: +moment
          .duration(departureDate?.diff(arrivalDate))
          .asDays()
          .toFixed(),
        location: data.location,
        reason: data.reason,
        departureDate: (data.departureDate as Moment).toString(),
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
          setArrivalDate(null);
          setDepartureDate(null);
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TRAVEL_REQUESTS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TRAVEL_REQUISITIONS_FOR_AUTH_EMPLOYEE],
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
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          name="arrivalDate"
          label="Arrival Date"
        >
          <DatePicker
            placeholder="Arrival Date"
            className="w-full"
            onChange={setArrivalDate}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              validator: async (rule: any, value: Moment) => {
                if (value.isBefore(arrivalDate)) {
                  throw new Error(
                    "Departure Date cannot be before arrival date!"
                  );
                }

                return true;
              },
            },
          ]}
          name="departureDate"
          label="Departure Date"
        >
          <DatePicker
            placeholder="Departure Date"
            className="w-full"
            onChange={setDepartureDate}
          />
        </Form.Item>
        <Form.Item label="Duration (days)">
          <InputNumber
            placeholder="Duration"
            className="w-full"
            disabled
            value={
              departureDate &&
              arrivalDate &&
              moment
                .duration(departureDate?.diff(arrivalDate))
                .asDays()
                .toFixed()
            }
          />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="clientName"
          label="Client Name"
        >
          <Input placeholder="Client Name" />
        </Form.Item>

        <Form.Item
          rules={generalValidationRulesOp}
          name="priority"
          label="Priority"
        >
          <Select options={PRIORITIES} placeholder="Priority" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              ...numberHasToBeGreaterThanZeroRule,
            },
          ]}
          name="cost"
          label="Cost"
        >
          <InputNumber placeholder="Cost" className="w-full" />
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
