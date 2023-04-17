import { DatePicker, Drawer, Form, Select } from "antd";
import { IDrawerProps } from "types";
const { Option } = Select;

const departList = ["CSI", "Dev Team", "Sales"];
const jobRoleList = ["Frontend Dev", "Backend Dev", "Devops"];

export const AssignNewRole = ({ open, handleClose }: IDrawerProps) => {
  const validate = [{ required: true, message: "Field id required" }];
  return (
    <Drawer
      title="Assign New Role"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form className="mt-5" layout="vertical">
        <Form.Item name="department" rules={validate} label="Select Department">
          <Select
            showSearch
            allowClear
            optionLabelProp="label"
            className="SelectTag w-full"
            size="large"
            placeholder="Select department"
          >
            {departList.map((data) => (
              <Option key={data} value={data} label={data}>
                {data}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="jobRole" rules={validate} label="Job Role">
          <Select
            showSearch
            allowClear
            optionLabelProp="label"
            className="SelectTag w-full"
            size="large"
            placeholder="Select Job Role"
          >
            {jobRoleList.map((data) => (
              <Option key={data} value={data} label={data}>
                {data}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="startDate" label="Start Date" rules={validate}>
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <Form.Item name="endDate" label="End Date" rules={validate}>
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <button className="button mt-4">Submit</button>
      </Form>
    </Drawer>
  );
};
