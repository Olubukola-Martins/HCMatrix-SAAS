import { DatePicker, Drawer, Form, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { IDrawerProps } from "types";

export const FilterUdemReport = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer
      title="Filter Report"
      open={open}
      onClose={() => handleClose(false)}
      footer={null}
      drawerStyle={{ background: "#f6f7fb" }}
    >
      <Form layout="vertical">
        <Form.Item name="role" label="Role">
          <Select
            placeholder="Select"
            options={[
              { value: 2, label: "Admin" },
              { value: 1, label: "Employee" },
            ]}
          />
        </Form.Item>
        <Form.Item name="joinedDate" label="Joined date">
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>
        <AppButton type="submit" label="Filter" />
      </Form>
    </Drawer>
  );
};
