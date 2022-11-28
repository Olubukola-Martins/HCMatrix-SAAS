import { DatePicker, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { IModalProps } from "../../../../AppTypes/Component";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../../FormHelpers/validation";
const { RangePicker } = DatePicker;

export const AddDelegation = ({ open, handleClose }: IModalProps) => {
  const [delegationTypeValue, setDelegationTypeValue] = useState("");
  return (
    <Modal
      title="Add Delegation"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item name="delegator" label="Delegator">
          <Input
            defaultValue="Godswill Smile"
            className="generalInputStyle"
            disabled
          />
        </Form.Item>
        <Form.Item
          name="delegatee"
          label="Delegatee"
          rules={generalValidationRules}
        >
          <Select
            showSearch
            allowClear
            optionLabelProp="label"
            className="SelectTag w-full"
            size="large"
            placeholder="Select Delegatee"
          >
            {["Isaac Odeh", "Obi james"].map((data) => (
              <Select.Option key={data} value={data} label={data}>
                {data}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="delegationType"
          label="Delegation Type"
          rules={textInputValidationRules}
        >
          <Select
            placeholder="Select delegation type"
            className="SelectTag w-full"
            size="large"
            onChange={(val) => setDelegationTypeValue(val)}
          >
            <Select.Option value="permanent">Permanent</Select.Option>
            <Select.Option value="temporary">Temporary</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="period" label="Select Period">
          <RangePicker
            className="generalInputStyle"
            disabled={
              delegationTypeValue === ""
                ? true
                : delegationTypeValue === "temporary"
                ? false
                : true
            }
          />
        </Form.Item>
        <Form.Item
          name="permission"
          label="Permission"
          rules={generalValidationRules}
        >
          <Select
            showSearch
            allowClear
            optionLabelProp="label"
            className="SelectTag w-full"
            size="large"
            placeholder="Select Permission"
          >
            {["Payroll approval", "Loan approval"].map((data) => (
              <Select.Option key={data} value={data} label={data}>
                {data}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          requiredMark="optional"
        >
          <TextArea
            rows={3}
            className="generalInputStyle"
            placeholder="Enter Description"
          />
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Modal>
  );
};
