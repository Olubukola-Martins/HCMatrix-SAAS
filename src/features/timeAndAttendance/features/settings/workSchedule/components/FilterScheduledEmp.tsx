import { Drawer, Form, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useState } from "react";
import { IDrawerProps } from "types";
import { scheduleFilterProps } from "../types";
import { openNotification } from "utils/notifications";

interface FilterShiftPerEmployeeProps extends IDrawerProps {
  setFilterData: React.Dispatch<
    React.SetStateAction<scheduleFilterProps | undefined>
  >;
}

export const FilterScheduledEmp = ({
  handleClose,
  open,
  setFilterData,
}: FilterShiftPerEmployeeProps) => {
  const [form] = Form.useForm();
  const [empUid, setEmpUid] = useState<string>();

  const submit = (value: any) => {
    if (value.employeeId || value.shiftType) {
        setFilterData({
          empUid: empUid,
          shiftType: value.shiftType,
        })
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
    <Drawer title="Filter" open={open} onClose={() => handleClose()}>
      <Form layout="vertical" form={form}>
        <FormEmployeeInput
          Form={Form}
          optional={true}
          handleSelect={(_, val) => setEmpUid(val?.empUid)}
        />
        <Form.Item name="shiftType" label="Shift Type">
          <Select
            className="w-full"
            placeholder="Select"
            options={[
              { value: "morning", label: "Morning" },
              { value: "afternoon", label: "Afternoon" },
              { value: "evening", label: "Evening" },
            ]}
            allowClear
          />
        </Form.Item>

        <AppButton type="submit" />
      </Form>
    </Drawer>
  );
};
