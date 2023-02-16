import { DatePicker, Drawer, Form, Input } from "antd";
import { IDrawerProps } from "../../../../../../AppTypes/Component";
import { generalValidationRules } from "../../../../../../FormHelpers/validation";

export const SaveEmploymentHistory = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer
      title="Add Employment History"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form layout="vertical" className="mt-5">
        <Form.Item
          name="organization"
          label="Organization"
          rules={generalValidationRules}
        >
          <Input
            className="generalInputStyle"
            placeholder="Enter Organization"
          />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={generalValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Position" />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Drawer>
  );
};
