import {
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Switch,
    Typography,
  } from "antd";
  import React from "react";
import { Link } from "react-router-dom";
//   import { PageIntro } from "../../Layout/Components/PageIntro";
  import DashboardLayout from "../../Layout/DashboardLayout";
  const { Text } = Typography;
  const { Option } = Select;
  
  const PurchaseUserLicense = () => {
    const userPrice = 4;
    const adminPrice = 6;
    const FormRules = [
      { required: true, message: "Field is required" },
      { whitespace: true },
    ];
    return (
      <DashboardLayout>
        <div className="Container mt-5">
          {/* <PageIntro title="Purchase User License" link="/billings" /> */}
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mt-6">
            <div className="bg-card p-2 md:p-3 lg:p-5 rounded">
              <Form
                onFinishFailed={(val) => console.log(val)}
                onFinish={(val) => console.log(val)}
                layout="vertical"
              >
                <div className="bg-mainBg p-3 shadow-sm rounded">
                  <h2 className="font-medium text-base pb-4">
                    Number of User License
                  </h2>
                  <Form.Item
                    name="administrators"
                    label="Administrators"
                    rules={FormRules}
                  >
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      className="w-full rounded py-2 border border-slate-400"
                    />
                    <span className="flex justify-end text-xs pt-1">
                      Price Per Admin:
                      {adminPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </Form.Item>
  
                  <Form.Item name="employee" rules={FormRules} label="Employee">
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      className="w-full rounded py-2 border border-slate-400"
                    />
                    <span className="flex justify-end text-xs pt-1">
                      Price Per Employee:
                      {userPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </Form.Item>
                </div>
  
                <div className="my-3 bg-mainBg p-3 shadow-sm rounded">
                  <Form.Item
                    name="billingCycle"
                    rules={FormRules}
                    label="Select Your Billing Cycle"
                  >
                    <Select placeholder="Select" size="large">
                      <Option value="monthly">Monthly</Option>
                      <Option value="yearly">Yearly</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="bg-mainBg shadow-sm rounded">
                  <Form.Item className="p-3">
                    <Row justify="space-between">
                      <Col span={20}>
                        <Text>Make Payment Recurring Monthly</Text>
                      </Col>
                      <Col span={3}>
                        <Switch defaultChecked />
                      </Col>
                    </Row>
                  </Form.Item>
                </div>
  
                <div className="flex justify-between items-center mt-6">
                  <Link to="/billings" type="button" className="transparentButton">
                    Cancel
                  </Link>
                  <button type="submit" className="button">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
            <div>
              <div className="bg-card p-2 md:p-3 lg:p-5 rounded">
                <div className="bg-mainBg p-3 shadow-sm rounded">
                  <h2 className="font-medium text-base pb-4">Summary</h2>
                  <div className="border rounded-md p-3 flex justify-between">
                    <div>
                      <p>Number of Administrators</p>
                      <h3 className="font-semibold text-lg">0</h3>
                    </div>
                    <div>
                      <p>Amount Monthly</p>
                      <h3 className="font-semibold text-lg">0</h3>
                    </div>
                  </div>
                  <div className="border rounded-md p-3 flex justify-between my-5">
                    <div>
                      <p>Number of Employees</p>
                      <h3 className="font-semibold text-lg">0</h3>
                    </div>
                    <div>
                      <p>Amount Monthly</p>
                      <h3 className="font-semibold text-lg">0</h3>
                    </div>
                  </div>
  
                  <div className="flex justify-between px-2">
                    <p>Total User Licenses</p>
                    <h3 className="font-semibold text-lg">0</h3>
                  </div>
                  <div className="flex justify-between px-2 mt-2">
                    <p>Total Amount</p>
                    <h3 className="font-semibold text-lg">0</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  };
  
  export default PurchaseUserLicense;
  