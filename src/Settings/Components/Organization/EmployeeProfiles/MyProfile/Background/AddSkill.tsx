import { Drawer, Form, Input, Select } from "antd";
import { IDrawerProps } from "../../../../../../AppTypes/Component";
import { inputValidationRules } from "../../../../../../FormHelpers/validation";
const { Option } = Select;

export const AddSkill = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer
      title="Add Skill"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form layout="vertical" className="mt-5">
        <Form.Item name="skill" label="Skill" rules={inputValidationRules}>
          <Input className="generalInputStyle" placeholder="Enter Skill" />
        </Form.Item>
        <Form.Item
          name="competency"
          label="Competency"
          rules={[{ required: true }]}
        >
          <Select
            className="SelectTag w-full"
            size="large"
            placeholder="Select Competency"
          >
            <Option value="Grade 1">Grade 1</Option>
            <Option value="Grade 2">Grade 2</Option>
            <Option value="Grade 3">Grade 3</Option>
          </Select>
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Drawer>
  );
};
