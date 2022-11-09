import { Form, Input, InputNumber, message, Select, Tooltip } from "antd";
import { useState } from "react";
import { phoneCodeList } from "../../../../../../Helpers/phoneCodeList";
const { Option } = Select;

export const EmergencyContact = () => {
  const [disable, setDisable] = useState(true);
  const [getPhoneCode, setGetPhoneCode] = useState("");

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  const onsubmit = (values: {
    name: any;
    address: any;
    relationship: any;
    phone: any;
  }) => {
    const { name, address, relationship, phone } = values;

    console.log(name, address, relationship, `${getPhoneCode} + ${phone}`);
  };

  const handlePhoneCode = (val: any) => {
    // console.log(event);
    setGetPhoneCode(val);
  };

  const initialValues = {
    name: "John Doe",
    address: "Avenue 34, Lekki Arena, Lagos.",
    relationship: "",
    phone: "",
  };

  const selectBefore = (
    <Select
      showSearch
      allowClear
      optionLabelProp="label"
      disabled={disable}
      defaultValue="+234"
      style={{ width: 90 }}
      onChange={handlePhoneCode}
    >
      {phoneCodeList.map((data) => (
        <Option key={data.code} value={data.code} label={data.code}>
          {data.code}
        </Option>
      ))}
    </Select>
  );
  return (
    <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
      <div className="flex justify-between mb-3">
        <h2 className="font-medium text-lg">Emergency Contact</h2>
        <Tooltip title={disable ? "Enable editing" : "Disable editing"}>
          <i
            className={
              disable
                ? `ri-pencil-line cursor-pointer hover:text-caramel text-xl`
                : `ri-lock-line cursor-pointer hover:text-caramel text-xl`
            }
            onClick={enableEdit}
          ></i>
        </Tooltip>
      </div>

      <div className="bg-card p-3 rounded">
        <Form
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initialValues={initialValues}
          onFinish={onsubmit}
        >
          <Form.Item name="name" label="Full Name">
            <Input className="generalInputStyle" disabled={disable} />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input className="generalInputStyle" disabled={disable} />
          </Form.Item>
          <Form.Item name="relationship" label="Relationship">
            <Select
              className="SelectTag w-full"
              size="large"
              disabled={disable}
            >
              <Option value="spouse">Spouse</Option>
              <Option value="boyfriend">Boyfriend</Option>
              <Option value="girlfriend">Girlfriend</Option>
              <Option value="FamilyMember">Family member</Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="Phone Number">
            <InputNumber
              addonBefore={selectBefore}
              size="large"
              className="w-full"
              disabled={disable}
              placeholder="Input phone"
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
  );
};
