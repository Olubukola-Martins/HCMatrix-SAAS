import { DatePicker, Form, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { Link } from "react-router-dom";

export const EmpPerShift = () => {
  return (
    <>
      <div className="bg-card p-3 rounded-md">
        <div className="bg-mainBg p-3 rounded-md">
          <h3 className="font-semibold text-base py-3">Employee Per Shift</h3>
          <Form
            onFinish={(val) => console.log(val)}
            layout="vertical"
            className="bg-card grid grid-cols-1 lg:grid-cols-2 gap-5 p-3"
          >
            <div>
              <Form.Item name="department" label="Select Department">
                <Select
                  allowClear
                  placeholder="Select"
                  options={[{ label: "Department", value: "department" }]}
                />
              </Form.Item>
              <FormEmployeeInput
                Form={Form}
                control={{ name: "employee", label: "Select Employee" }}
                mode="multiple"
              />
            </div>

            <div>
              <Form.Item name="date" label="Date">
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item name="shift" label="Shift">
                <Select
                  placeholder="Select"
                  options={[
                    {
                      value: "shift",
                      label: "Shift",
                    },
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
