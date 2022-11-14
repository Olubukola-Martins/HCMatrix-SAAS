import { DatePicker, Drawer, Form, Input, InputNumber, Select } from "antd";
import { IDrawerProps } from "../../../../../../AppTypes/Component";
import { inputValidationRules } from "../../../../../../FormHelpers/validation";
const { Option } = Select;

export const AddDependents = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer
      title="Add Dependent"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      {/* <p onClick={() => handleClose()}>Some contents...</p> */}

      <Form layout="vertical" className="mt-5">
        <Form.Item name="name" label="Full Name" rules={inputValidationRules}>
          <Input className="generalInputStyle" placeholder="Enter Name" />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={inputValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Phone" />
        </Form.Item>
        <Form.Item
          name="relationship"
          label="Relationship"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Select
            className="SelectTag w-full"
            size="large"
            placeholder="Select"
          >
            <Option value="spouse">Spouse</Option>
            <Option value="boyfriend">Boyfriend</Option>
            <Option value="girlfriend">Girlfriend</Option>
            <Option value="FamilyMember">Family member</Option>
          </Select>
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Drawer>
  );
};
