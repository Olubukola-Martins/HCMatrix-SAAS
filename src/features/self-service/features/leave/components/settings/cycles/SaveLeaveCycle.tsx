import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { TLeaveCycle } from "../LeaveCyclesAccordian";
import moment, { Moment } from "moment";

interface IProps extends IModalProps {
  onSubmit: {
    fn: (props: Pick<TLeaveCycle, "name" | "startDate" | "endDate">) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
  };
  defaultData?: TLeaveCycle;
  action: "add" | "edit";
}

export const SaveLeaveCycle: React.FC<IProps> = ({
  open,
  handleClose,
  onSubmit,
  defaultData,
  action,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!defaultData) return;
    form.setFieldsValue({
      name: defaultData.name,
      duration: [
        moment(defaultData.startDate ?? null),
        moment(defaultData.endDate ?? null),
      ],
    });
  }, [form, defaultData]);

  // close modal if onSubmit is success
  useEffect(() => {
    if (!onSubmit.isSuccess) return;
    handleClose();
  }, [form, onSubmit.isSuccess, handleClose]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={
        <span>
          {action === "add" && "Add Leave Cycle"}
          {action === "edit" && "Edit Leave Cycle"}
        </span>
      }
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={(data) =>
          onSubmit.fn({
            name: data.name,
            endDate: (data.duration[1] as Moment).toISOString(),
            startDate: (data.duration[0] as Moment).toISOString(),
          })
        }
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Cycle Name" />
        </Form.Item>
        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange]}
          name="duration"
          label="Duration"
        >
          <DatePicker.RangePicker
            placeholder={[`Start Date`, `End Date`]}
            className="w-full"
          />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton
            type="submit"
            label="Save"
            isLoading={onSubmit.isLoading}
          />
        </div>
      </Form>
    </Modal>
  );
};
