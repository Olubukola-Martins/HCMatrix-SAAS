import { Drawer, Form, Select } from "antd";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FilterScheduledEmp = ({ handleClose, open, id }: IDrawerProps) => {
  const [form] = Form.useForm();
  
const submit = (values: any) => {
    
}
  

  return (
    <Drawer title="Filter" open={open} onClose={() => handleClose()}>
      <Form>
        <FormEmployeeInput Form={Form} />
        <Form.Item
          name="shiftType"
          label="Shift Type"
          rules={generalValidationRules}
        >
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
      </Form>
    </Drawer>
  );
};
