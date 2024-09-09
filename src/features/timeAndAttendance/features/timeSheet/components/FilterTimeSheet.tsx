import { DatePicker, Drawer, Form, Select } from "antd";
import React, { useState } from "react";
import { IDrawerProps } from "types";
import { timeSheetFilterProps } from "../types";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { AppButton } from "components/button/AppButton";
import {
  dateHasToBeLesserThanOrEqualToCurrentDayRule,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface FilterProps extends IDrawerProps {
  setFilterData: React.Dispatch<
    React.SetStateAction<timeSheetFilterProps | undefined>
  >;
  attendanceView: string;
}

export const FilterTimeSheet = ({
  handleClose,
  open,
  setFilterData,
  attendanceView,
}: FilterProps) => {
  const [form] = Form.useForm();
  const [selectedPeriod, setSelectedPeriod] = useState<string>();
  const [empUid, setEmpUid] = useState<string>();

  const onSubmit = (data: any) => {
    const startD = data.duration ? data.duration[0].format("YYYY-MM-DD") : null;
    const endD = data.duration ? data.duration[1].format("YYYY-MM-DD") : null;
    const date = data.date ? data.date.format("MM/DD/YYYY") : null;
    if (data.period || data.employeeId) {
      setFilterData({
        employeeId: empUid,
        period: data.period,
        endDate: endD,
        startDate: startD,
        date: date,
      });
      handleClose();
      form.resetFields();
    } else {
      openNotification({
        state: "error",
        title: "Error",
        description: "Please filter with at least 1 value",
        duration: 4.5,
      });
    }
  };

  return (
    <Drawer onClose={() => handleClose()} open={open} title="Filter Time Sheet">
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        {attendanceView === "withPermission" && (
          <FormEmployeeInput
            Form={Form}
            optional={true}
            handleSelect={(_, val) => setEmpUid(val?.empUid)}
          />
        )}

        <Form.Item name="period" label="Period">
          <Select
            options={[
              { value: "weekly", label: "Weekly" },
              { label: "Custom", value: "custom" },
            ]}
            placeholder="Select"
            allowClear
            onChange={(val: string) => setSelectedPeriod(val)}
          />
        </Form.Item>
        {selectedPeriod === "custom" && (
          <Form.Item
            name="duration"
            label="Duration"
            rules={generalValidationRules}
          >
            <DatePicker.RangePicker className="w-full" format="MM/DD/YYYY" />
          </Form.Item>
        )}
        {selectedPeriod === "weekly" && (
          <Form.Item
            name="date"
            label="Date/week"
            rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
          >
            <DatePicker className="w-full" format="MM/DD/YYYY" />
          </Form.Item>
        )}
        <AppButton label="Apply Filter" type="submit" />
      </Form>
    </Drawer>
  );
};
