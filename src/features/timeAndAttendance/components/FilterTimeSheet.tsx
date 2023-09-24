import { DatePicker, Drawer, Form, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IDrawerProps } from "types";

export const FilterTimeSheet = ({ handleClose, open }: IDrawerProps) => {
  return (
    <Drawer title="Filter Time sheet" open={open} onClose={() => handleClose()}>
      <Form layout="vertical">
        <FormEmployeeInput
          Form={Form}
          control={{ name: "employee", label: "Select Employee" }}
          mode="multiple"
        />
        <Form.Item name="week" label="Week">
          <DatePicker.RangePicker picker="week" className="w-full" />
        </Form.Item>

        <AppButton label="Apply" type="submit" />
      </Form>
    </Drawer>
  );
};
