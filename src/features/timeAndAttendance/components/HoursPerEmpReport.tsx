import { Form, Select, Switch, DatePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { Link } from "react-router-dom";

export const HoursPerEmpReport = () => {
  return (
    <>
      <div className="bg-card p-3 rounded-md">
        <div className="bg-mainBg p-3 rounded-md">
          <h3 className="font-semibold text-base py-3">Hours Per Employee</h3>
          <Form
            onFinish={(val) => console.log(val)}
            layout="vertical"
            className="bg-card grid grid-cols-1 lg:grid-cols-2 gap-5 p-3"
          >
            <div>
              <FormEmployeeInput
                Form={Form}
                control={{ name: "employee", label: "Select Employee" }}
                mode="multiple"
              />

              <Form.Item name="status" label="Status">
                <Select
                  allowClear
                  placeholder="Select"
                  options={[
                    { label: "All", value: "all" },
                    { label: "Approved", value: "approved" },
                    { label: "Rejected", value: "rejected" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="time" label="Schedule Time">
                <Select
                  allowClear
                  placeholder="Select"
                  options={[
                    { label: "All", value: "all" },
                    {
                      label: "With start and end",
                      value: "With start and end",
                    },
                    {
                      label: "Without start and end",
                      value: "Without start and end",
                    },
                  ]}
                />
              </Form.Item>
              <div>
                <h3>Include all Employees</h3>
                <div className="flex gap-2 pt-2">
                  <Form.Item
                    name="allEmployees"
                    className="bg-mainBg w-full py-1 px-2"
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                  </Form.Item>
                  <i className="ri-error-warning-line text-xl cursor-pointer"></i>
                </div>
              </div>
            </div>

            <div>
              <Form.Item name="date_range" label="Date Range">
                <DatePicker.RangePicker className="w-full" />
              </Form.Item>
              <Form.Item name="shift_type" label="Include Shift Types">
                <Select
                  placeholder="Select"
                  allowClear
                  options={[
                    { label: "Arrived Late", value: 1 },
                    { label: "Absent", value: 2 },
                    { label: "Meetings", value: 3 },
                    { label: "Sick unpaid", value: 4 },
                    { label: "Time off", value: 5 },
                    { label: "Training", value: 6 },
                  ]}
                />
              </Form.Item>
              <div>
                <h3>Include all Employees</h3>
                <Form.Item
                  name="normalShift"
                  className="bg-mainBg w-full py-1 px-2 mt-3"
                >
                  <Switch checkedChildren="Yes" unCheckedChildren="No" />
                </Form.Item>
              </div>
              <Form.Item
                name="shift_duration"
                label="Only include shift if shift duration is: "
              >
                <Select
                  placeholder="Select"
                  allowClear
                  options={[
                    { label: "Specified", value: 1 },
                    { label: "Not specified", value: 2 },
                    { label: "Equal to", value: 3 },
                    { label: "Greater than", value: 4 },
                    { label: "Greater than or equal to", value: 5 },
                    { label: "Less than", value: 6 },
                    { label: "Less than or equal to", value: 7 },
                    { label: "Not equal to", value: 8 },
                  ]}
                />
              </Form.Item>
              <div className="flex justify-end">
                <AppButton type="submit" />
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-5">
        <Link to="#" className="transparentButton">
          View Report
        </Link>
        <a href="#" className="button">
          Download Report
        </a>
      </div>
    </>
  );
};
