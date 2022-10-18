import { Form, Switch, Input, InputNumber, Button } from "antd";
import Themes from "../../../Themes/Themes";

const AddLeaveTypeForm = () => {
  return (
    <div>
      <Form labelCol={{ span: 24 }}>
        <Form.Item label="Type Name">
          <Input placeholder="Type Name" />
        </Form.Item>
        <Form.Item label="Length">
          <InputNumber placeholder="Length" className="w-full" />
        </Form.Item>
        <Form.Item label="Employees Get Leave Allowance">
          <Switch unCheckedChildren="Yes" checkedChildren="No" />
        </Form.Item>

        <div className="flex flex-row justify-between items-center">
          <Button type="text">Cancel</Button>
          <div className="flex flex-row gap-4">
            <Button type="ghost">Save And Add Another</Button>
            <Themes isBg={false}>
              <button className="button w-full" htmlType="submit">
                Submit
              </button>
            </Themes>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddLeaveTypeForm;
