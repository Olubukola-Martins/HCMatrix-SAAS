import { DatePicker, Drawer, Form, Input } from "antd";
import { IDrawerProps } from "../../../../../../AppTypes/Component";
import { generalValidationRules } from "../../../../../../FormHelpers/validation";

export const AddEducationDetails = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer
      title="Add Education Details"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form layout="vertical" className="mt-5">
        <Form.Item
          name="school"
          label="School"
          rules={generalValidationRules}
        >
          <Input
            className="generalInputStyle"
            placeholder="Enter School"
          />
        </Form.Item>
        <Form.Item
          name="degree"
          label="Degree"
          rules={generalValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Degree" />
        </Form.Item>
        <Form.Item
          name="specialization"
          label="Specialization"
          rules={generalValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Specialization" />
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
