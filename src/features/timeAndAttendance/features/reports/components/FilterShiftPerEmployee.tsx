import { DatePicker, Drawer, Form, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IDrawerProps } from "types";
import { filterReportProps } from "../types";
import { openNotification } from "utils/notifications";
import { useState } from "react";

interface FilterShiftPerEmployeeProps extends IDrawerProps {
  setFilterData: React.Dispatch<
    React.SetStateAction<filterReportProps | undefined>
  >;
}

export const FilterShiftPerEmployee = ({
  handleClose,
  open,
  setFilterData,
}: FilterShiftPerEmployeeProps) => {
  const [empUid, setEmpUid] = useState<string>();
  const [form] = Form.useForm();
  const onSubmit = (data: any) => {
    const startD = data.duration ? data.duration[0].format("MM/DD/YYYY") : null;
    const endD = data.duration ? data.duration[1].format("MM/DD/YYYY") : null;

    if (
      data.departmentId ||
      data.employeeId ||
      data.shiftTypes ||
      data.duration
    ) {
      setFilterData({
        departmentId: data.departmentId,
        employeeId: empUid,
        shiftTypes: data.shiftTypes,
        endDate: endD,
        startDate: startD,
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
    <Drawer onClose={() => handleClose()} open={open} title="Filter Report">
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <FormEmployeeInput
          Form={Form}
          optional={true}
          handleSelect={(_, val) => setEmpUid(val?.empUid)}
        />
        <FormDepartmentInput Form={Form} optional={true} />
        <Form.Item name="shiftTypes" label="Shifts">
          <Select
            options={[
              { value: "Morning", label: "Morning" },
              { value: "Afternoon", label: "Afternoon" },
              { value: "Evening", label: "Evening" },
            ]}
            allowClear
            placeholder="Select"
          />
        </Form.Item>
        <Form.Item name="duration" label="Duration" requiredMark="optional">
          <DatePicker.RangePicker className="w-full" format="MM/DD/YYYY" />
        </Form.Item>
        <AppButton label="Apply Filter" type="submit" />
      </Form>
    </Drawer>
  );
};
