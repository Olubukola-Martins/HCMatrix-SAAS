import { Form, Input, Modal, Select } from "antd";
import { IModalProps } from "../../../../AppTypes/Component";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../../FormHelpers/validation";

export const AddDepartment = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Department"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item
          name="name"
          label="Department Name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Department" className="generalInputStyle" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              type: "email",
              message: "Wrong email format",
            },
          ]}
          name="mail"
          label="Mail Alias"
          requiredMark="optional"
        >
          <Input placeholder="john@gmail.com" className="generalInputStyle" />
        </Form.Item>
        <Form.Item
          name="departmentHead"
          label="Department Head"
          rules={generalValidationRules}
        >
          <Select
            showSearch
            allowClear
            optionLabelProp="label"
            className="SelectTag w-full"
            size="large"
            placeholder="Select Department Head"
          >
            {["Faith John", "Godswill Smile"].map((data) => (
              <Select.Option key={data} value={data} label={data}>
                {data}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Modal>
  );
};
