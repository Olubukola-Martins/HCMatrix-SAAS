import { DatePicker, Drawer, Form } from "antd";
import React from "react";
import { IDrawerProps } from "types";
import { timeSheetFilterProps } from "../types";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { AppButton } from "components/button/AppButton";

interface FilterProps extends IDrawerProps {
  setFilterData: React.Dispatch<
    React.SetStateAction<timeSheetFilterProps | undefined>
  >;
}

export const FilterTimeSheet = ({
  handleClose,
  open,
  setFilterData,
}: FilterProps) => {
  const [form] = Form.useForm();
  const onSubmit = (data: any) => {
    
  };

  return (
    <Drawer onClose={() => handleClose()} open={open} title="Filter Report">
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <FormEmployeeInput Form={Form} optional={true} />

        <Form.Item name="duration" label="Duration" requiredMark="optional">
          <DatePicker.RangePicker className="w-full" format="MM/DD/YYYY" />
        </Form.Item>
        <AppButton label="Apply Filter" type="submit" />
      </Form>
    </Drawer>
  );
};
