import { DatePicker, Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange } from "utils/formHelpers/validation";
import dayjs, { Dayjs } from "dayjs";
import { TLeaveCycle } from "../../../types";
import { TSaveLeaveCycleProps } from "../../../hooks/leaveCycles/useSaveLeaveCycle";

interface IProps extends IModalProps {
  onSubmit: {
    fn: (props: TSaveLeaveCycleProps) => void;
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
      duration: [
        dayjs(
          `${dayjs().format("YYYY")}-${defaultData.endMonth + 1}-${
            defaultData.endDay
          }`
        ),
        dayjs(
          `${dayjs().format("YYYY")}-${defaultData.startMonth + 1}-${
            defaultData.startDay
          }`
        ),
      ],
    });
  }, [form, defaultData]);

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
            endDay: +(data.duration[1] as Dayjs).format(`DD`),
            startDay: +(data.duration[0] as Dayjs).format(`DD`),
            endMonth: +(data.duration[1] as Dayjs).format(`MM`) - 1, //cos of backend api, using 0 - 11 for month
            startMonth: +(data.duration[0] as Dayjs).format(`MM`) - 1, //cos of backend api, using 0 - 11 for month
          })
        }
        requiredMark={false}
      >
        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange]}
          name="duration"
          label="Duration"
        >
          <DatePicker.RangePicker
            format={`DD, MMMM`}
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
