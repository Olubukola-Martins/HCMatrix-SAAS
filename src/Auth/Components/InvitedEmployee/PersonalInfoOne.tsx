import { DatePicker, Form, Input, Select, Upload } from "antd";
import { stepperInputProps } from "Auth/Pages/InvitedEmployeeForm";
import {
  generalValidationRules,
  textInputValidationRules,
} from "FormHelpers/validation";
import { countryList } from "Helpers/countryList";
import { stateList } from "Helpers/stateList";
import { useState } from "react";
const { Option } = Select;

export const PersonalInfo = ({
  onFinished,
  initialValues,
  setCurrent,
}: stepperInputProps) => {
  const [hiddenInputs, setHiddenInputs] = useState("");
  const handleCitizen = (val: string) => {
    setHiddenInputs(val);
  };
  const citizenCheck = hiddenInputs === "NotCitizen" ? false : true;
  return (
    <div>
      <Form
        onFinish={onFinished}
        initialValues={initialValues}
        layout="vertical"
        requiredMark={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="last Name"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={textInputValidationRules}
          >
            <Input placeholder="Enter phone" />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={generalValidationRules}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={generalValidationRules}
          >
            <Select className="w-full" placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="maritalStatus"
            label="Marital Status"
            rules={generalValidationRules}
          >
            <Select className="w-full" placeholder="Select">
              <Option value="married">Married</Option>
              <Option value="single">Single</Option>
              <Option value="widowed">Widowed</Option>
              <Option value="divorced">Divorced</Option>
              <Option value="separated">Separated</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="employmentEligibility"
            label="Employment Eligibility"
            rules={generalValidationRules}
          >
            <Select placeholder="Select" onChange={handleCitizen}>
              <Option value="citizen">Citizen</Option>
              <Option value="NotCitizen">Not a citizen</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="passportExpirationDate"
            label="Passport Expiration Date"
          >
            <DatePicker
              format="YYYY/MM/DD"
              className="generalInputStyle"
              disabled={citizenCheck}
            />
          </Form.Item>

          <Form.Item label="Upload valid document">
            <Upload>
              <Input
                type="file"
                className="generalInputStyle"
                disabled={citizenCheck}
              />
            </Upload>
          </Form.Item>
          <Form.Item
            name="nationality"
            label="Nationality"
            rules={generalValidationRules}
          >
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              placeholder="Select"
            >
              {countryList.map((data) => (
                <Option key={data} value={data} label={data}>
                  {data}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="state" label="State" rules={generalValidationRules}>
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              placeholder="Select state"
            >
              {stateList.map((data) => (
                <Option key={data} value={data} label={data}>
                  {data}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="lga" label="LGA" rules={generalValidationRules}>
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              placeholder="Select"
            >
              {stateList.map((data) => (
                <Option key={data} value={data} label={data}>
                  {data}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="flex justify-between mt-3">
          <button
            onClick={() => setCurrent(0)}
            type="button"
            className="transparentButton"
          >
            Prev
          </button>
          <button type="submit" className="button">
            Continue
          </button>
        </div>
      </Form>
    </div>
  );
};
