import { Form, Input, Modal, Select } from "antd";
import { IModalProps } from "../../../AppTypes/Component";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../FormHelpers/validation";

export const AddCompanyForm = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Sister Company"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={(val) => console.log(val)}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input
            className="generalInputStyle"
            placeholder="Enter Company Name"
          />
        </Form.Item>
        <Form.Item
          label="Organization"
          name="organization"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input
            className="generalInputStyle"
            placeholder="Enter Organization"
          />
        </Form.Item>
        <Form.Item
          name="industry"
          label="Industry"
          rules={generalValidationRules}
          hasFeedback
        >
          <Select
            showSearch
            allowClear
            optionLabelProp="label"
            className="authSelectTag"
            size="large"
            style={{ width: "100%" }}
            placeholder="Select Industry"
          >
            {["one", "two"].map((name) => (
              <Select.Option
                key={name}
                value={name}
                className="py-2"
                label={name}
              >
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input className="generalInputStyle" placeholder="Business Email" />
        </Form.Item>

        <Form.Item name="phone" hasFeedback label="Business Phone">
          <Input.Group compact>
            <Form.Item
              noStyle
              rules={generalValidationRules}
              name={["phone", "code"]}
            >
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                disabled={false}
                className="rounded border-slate-400 authSelectTag"
                style={{ width: "25%" }}
                placeholder="+234"
                size="large"
              >
                {["+234", "+345"].map((data) => (
                  <Select.Option key={data} value={data} label={data}>
                    {data}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              rules={textInputValidationRules}
              name={["phone", "number"]}
            >
              <Input
                style={{ width: "75%" }}
                placeholder="Business Phone"
                className="generalInputStyle"
                autoComplete="phone"
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <div className="flex justify-between items-center">
          <button className="transparentButton">Save And add another</button>
          <button className="button">Add Company</button>
        </div>
      </Form>
    </Modal>
  );
};
