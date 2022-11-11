import {
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Tooltip,
  Upload,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { countryList } from "../../../../../../Helpers/countryList";
import { stateList } from "../../../../../../Helpers/stateList";
const { Option } = Select;

export const Profile = () => {
  const [disable, setDisable] = useState(true);
  const [hiddenInputs, setHiddenInputs] = useState("");

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  const initialValues = {
    dateOfBirth: moment("2020-06-09T12:40:14+0000"),
    nationality: "Guatemala",
    gender: "male",
    maritalStatus: "married",
    state: "Abia",
    lga: "",
    employmentEligibility: "citizen",
    passportExpirationDate: "",
  };

  const handleCitizen = (val: string) => {
    setHiddenInputs(val);
  };

  return (
    <div>
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <div className="flex justify-between mb-3">
          <h2 className="font-medium text-lg">Personal Information</h2>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initialValues={initialValues}
            onFinish={(val) => console.log(val)}
          >
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker
                format="YYYY/MM/DD"
                className="generalInputStyle"
                disabled={disable}
              />
            </Form.Item>
            <Form.Item
              name="employmentEligibility"
              label="Employment Eligibility"
            >
              <Select
                className="SelectTag w-full"
                size="large"
                disabled={disable}
                placeholder="Select"
                onChange={handleCitizen}
              >
                <Option value="citizen">Citizen</Option>
                <Option value="NotCitizen">Not a citizen</Option>
              </Select>
            </Form.Item>

            {hiddenInputs === "NotCitizen" && (
              <Form.Item
                name="passportExpirationDate"
                label="Passport Expiration Date"
              >
                <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
              </Form.Item>
            )}
            {hiddenInputs === "NotCitizen" && (
              <Form.Item label="Upload valid document">
                <Upload>
                  <Input type="file" className="generalInputStyle" />
                </Upload>
              </Form.Item>
            )}
            {/* <Form.Item name="document" className="hidden">
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item> */}

            <Form.Item name="gender" label="Gender">
              <Select
                className="SelectTag w-full"
                size="large"
                disabled={disable}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item name="maritalStatus" label="Marital Status">
              <Select
                className="SelectTag w-full"
                size="large"
                disabled={disable}
              >
                <Option value="married">Married</Option>
                <Option value="single">Single</Option>
                <Option value="widowed">Widowed</Option>
                <Option value="divorced">Divorced</Option>
                <Option value="separated">Separated</Option>
              </Select>
            </Form.Item>

            <Form.Item name="nationality" label="Nationality">
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                className="SelectTag w-full"
                size="large"
                disabled={disable}
                placeholder="Select Nationality"
              >
                {countryList.map((data) => (
                  <Option key={data} value={data} label={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="state" label="State">
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                className="SelectTag w-full"
                size="large"
                disabled={disable}
                placeholder="Select state"
              >
                {stateList.map((data) => (
                  <Option key={data} value={data} label={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="lga" label="LGA">
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                className="SelectTag w-full"
                size="large"
                disabled={disable}
                placeholder="Select lga"
              >
                {stateList.map((data) => (
                  <Option key={data} value={data} label={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {!disable && (
              <div className="flex items-center">
                <button className="button">Save changes</button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
