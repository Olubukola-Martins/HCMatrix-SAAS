import { DatePicker, Form, Input, message, Select, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../../FormHelpers/validation";
import DashboardLayout from "../../../../Layout/DashboardLayout";
const { RangePicker } = DatePicker;

const DelegationDetail = () => {
  const [delegationTypeValue, setDelegationTypeValue] = useState("");
  const [disable, setDisable] = useState(true);

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  const initialValues = {
    delegator: "Godswill Smile",
    delegatee: "Isaac Odeh",
    delegationType: "permanent",
    description: "",
    permission: "Payroll approval",
  };
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/delegations">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-sm">Delegation</h5>
          </div>
          <Tooltip title={disable ? "Enable editing" : "Disable editing"}>
            {" "}
            <i
              onClick={enableEdit}
              className="ri-pencil-fill cursor-pointer text-xl"
            ></i>
          </Tooltip>
        </div>

        <div className="bg-card mt-5 pt-4 pb-10 px-4 rounded-md">
          <h3 className="text-accent font-bold text-lg mb-4">
            Delegation details
          </h3>
          <Form
            layout="vertical"
            initialValues={initialValues}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5"
            disabled={disable}
          >
            <Form.Item name="delegator" label="Delegator">
              <Input disabled className="generalInputStyle" />
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
            <div />
            <Form.Item
              name="description"
              label="Description"
              requiredMark="optional"
            >
              <TextArea
                rows={3}
                className="generalInputStyle"
                placeholder="Enter Description"
                disabled={disable}
              />
            </Form.Item>
            {!disable && (
              <div className="flex items-center">
                <button className="button">Save changes</button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DelegationDetail;
