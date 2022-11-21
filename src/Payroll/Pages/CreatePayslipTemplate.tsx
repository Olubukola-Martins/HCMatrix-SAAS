import { Form, Input, Radio, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { Link } from "react-router-dom";
import { textInputValidationRules } from "../../FormHelpers/validation";
import DashboardLayout from "../../Layout/DashboardLayout";
import PayrollSubNav from "../Components/PayrollSubNav";
const { Option } = Select;

const reportFields = [
  "Job Role",
  "Department",
  "Pay Group",
  "Pay grade",
  "Location",
  "Bank Details",
  "Employment Date",
  "Employer Email",
  "Employer Phone",
  "Employer Location",
];

const allowanceList = ["Housing allowance", "Housing allowance 2"];

const CreatePayslipTemplate = () => {
  const [extraD, setExtraD] = useState(false);

  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-sm pb-1";

  return (
    <DashboardLayout>
      <PayrollSubNav />
      <div className="Container">
        <div className="flex gap-2 text-accent">
          <Link to="/payroll/payslip">
            <i className="ri-arrow-left-s-line text-xl cursor-pointer"></i>
          </Link>
          <div>
            <h5 className="font-black text-lg">Create Payslip Template</h5>
          </div>
        </div>

        <div className="bg-card px-2 md:px-5 py-3 rounded-md mt-7 text-accent">
          <Form layout="vertical" onFinish={(val) => console.log(val)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <Form.Item
                  name="name"
                  label="Payslip Name"
                  rules={textInputValidationRules}
                >
                  <Input
                    className="generalInputStyle"
                    placeholder="Enter Payslip Name"
                  />
                </Form.Item>
                <Form.Item name="description" label="Payslip Description">
                  <TextArea
                    placeholder="Enter Payslip Description"
                    className="generalInputStyle"
                  />
                </Form.Item>
                <Form.Item name="allowance" label="Allowance">
                  <Select
                    showSearch
                    allowClear
                    mode="multiple"
                    optionLabelProp="label"
                    className="SelectTag w-full"
                    size="large"
                    placeholder="Select Allowance"
                  >
                    {allowanceList.map((data) => (
                      <Option key={data} value={data} label={data}>
                        {data}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="deduction" label="Deduction">
                  <Select
                    showSearch
                    allowClear
                    mode="multiple"
                    optionLabelProp="label"
                    className="SelectTag w-full"
                    size="large"
                    placeholder="Select Deduction"
                  >
                    {allowanceList.map((data) => (
                      <Option key={data} value={data} label={data}>
                        {data}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="flex flex-col">
                <Form.Item name="custom" label="Custom Field">
                  <Select
                    showSearch
                    allowClear
                    mode="multiple"
                    optionLabelProp="label"
                    className="SelectTag w-full"
                    size="large"
                    placeholder="Select Custom Field"
                  >
                    {reportFields.map((data) => (
                      <Option key={data} value={data} label={data}>
                        {data}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="showTax">
                  <div className={boxStyle}>
                    <div className="flex items-center justify-between">
                      <h5 className={boxTitle}>Show Tax</h5> <Switch />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item name="showExtraTax">
                  <div className={boxStyle}>
                    <div className="flex items-center justify-between">
                      <h5 className={boxTitle}>Show Extra Tax</h5> <Switch />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item name="showExtraDeduction">
                  <div className={boxStyle}>
                    <div className="flex items-center justify-between">
                      <h5 className={boxTitle}>Show Extra Deductions</h5>
                      <Switch
                        onChange={(checked: boolean) => setExtraD(checked)}
                      />
                    </div>

                    {extraD && (
                      <div className="pb-2">
                        <p className="text-xs pb-4 pt-2">
                          You can choose the Year to Date data to display on
                          this payslip.
                        </p>
                        <Radio.Group name="Extra Deductions">
                          <Radio value="YTD-Net">YTD-Net</Radio>
                          <Radio value="YTD Gross">YTD Gross</Radio>
                          <Radio value="YTD Tax">YTD Tax</Radio>
                        </Radio.Group>
                      </div>
                    )}
                  </div>
                </Form.Item>
              </div>
            </div>
            <div className="mt-1">
              <button className="button">Save Changes</button>
            </div>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatePayslipTemplate;
