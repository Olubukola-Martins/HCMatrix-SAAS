import { Col, Form, InputNumber, Row, Select, Switch, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { generalValidationRules } from "../../FormHelpers/validation";
import { PageIntro } from "../../Layout/Components/PageIntro";
import DashboardLayout from "../../Layout/DashboardLayout";
const { Text } = Typography;
const { Option } = Select;

const PurchaseUserLicense = () => {
  const [administratorNum, setAdministratorNum] = useState<number | any>(0);
  const [employeeNum, setEmployeeNum] = useState<number | any>(0);
  const [bCycle, setBCycle] = useState<string>("monthly");
  const employeePrice = 4;
  const adminPrice = 6;
  const totalAdminPrice = administratorNum * adminPrice;
  const totalEmployeePrice = employeeNum * employeePrice;
  const totalAmount = totalAdminPrice + totalEmployeePrice;

  return (
    <DashboardLayout>
      <div className="Container mt-5">
        <PageIntro title="Purchase User License" link="/billings" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mt-6">
          <div className="bg-card p-2 md:p-3 lg:p-5 rounded">
            <Form layout="vertical">
              <div className="bg-mainBg p-3 shadow-sm rounded">
                <h2 className="font-medium text-base pb-4">
                  Number of User License
                </h2>
                <Form.Item
                  name="administrators"
                  label="Administrators"
                  rules={generalValidationRules}
                >
                  <InputNumber
                    className="w-full rounded py-1 border border-slate-400"
                    min={1}
                    placeholder="1"
                    onChange={(val) => setAdministratorNum(val)}
                  />
                </Form.Item>
                <span className="flex justify-end text-xs -mt-4">
                  Price Per Admin:
                  {adminPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
                <Form.Item
                  name="employee"
                  label="Employee"
                  rules={generalValidationRules}
                >
                  <InputNumber
                    className="w-full rounded py-1 border border-slate-400"
                    min={1}
                    placeholder="1"
                    onChange={(val) => setEmployeeNum(val)}
                  />
                </Form.Item>
                <span className="flex justify-end text-xs -mt-4">
                  Price Per Employee:
                  {employeePrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
              <div className="my-3 bg-mainBg p-3 shadow-sm rounded">
                <Form.Item
                  name="billingCycle"
                  rules={generalValidationRules}
                  label="Select Your Billing Cycle"
                >
                  <Select
                    placeholder="Select"
                    size="large"
                    onChange={(val) => setBCycle(val)}
                  >
                    <Option value="monthly">Monthly</Option>
                    <Option value="yearly">Yearly</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="bg-mainBg shadow-sm rounded">
                <Form.Item className="p-3">
                  <Row justify="space-between">
                    <Col span={20}>
                      <Text>
                        Make payment recurring
                        <span className=" pl-1">{bCycle}</span>
                      </Text>
                    </Col>
                    <Col span={3}>
                      <Switch />
                    </Col>
                  </Row>
                </Form.Item>
              </div>
              <div className="flex justify-between items-center mt-6">
                <Link
                  to="/billings"
                  type="button"
                  className="transparentButton"
                >
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
                    <h3 className="font-semibold text-lg">
                      {administratorNum ? administratorNum : 0}
                    </h3>
                  </div>
                  <div>
                    <p>Amount Monthly</p>
                    <h3 className="font-semibold text-lg">
                      {totalAdminPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h3>
                  </div>
                </div>
                <div className="border rounded-md p-3 flex justify-between my-5">
                  <div>
                    <p>Number of Employees</p>
                    <h3 className="font-semibold text-lg">
                      {employeeNum ? employeeNum : 0}
                    </h3>
                  </div>
                  <div>
                    <p>Amount Monthly</p>
                    <h3 className="font-semibold text-lg">
                      {totalEmployeePrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h3>
                  </div>
                </div>

                <div className="flex justify-between px-2">
                  <p>Total User Licenses</p>
                  <h3 className="font-semibold text-lg">
                    {administratorNum + employeeNum}
                  </h3>
                </div>
                <div className="flex justify-between px-2 mt-2">
                  <p>Total Amount</p>
                  <h3 className="font-semibold text-lg">
                    {totalAmount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h3>
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
