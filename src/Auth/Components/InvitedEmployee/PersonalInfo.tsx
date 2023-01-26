import { DatePicker, Form, Input, Select, Upload } from "antd";
import {
  useFetchCountries,
  useFetchLgas,
  useFetchStates,
} from "APIRQHooks/Utility/countryHooks";
import { stepperInputProps } from "Auth/Pages/InvitedEmployeeForm";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import {
  generalValidationRules,
  textInputValidationRules,
} from "FormHelpers/validation";
import { FileUpload } from "GeneralComps/FileUpload";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useContext, useState } from "react";
const { Option } = Select;

export const PersonalInfo = ({
  onFinished,
  initialValues,
  setCurrent,
}: stepperInputProps) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const fileUrl = globalState.upLoadFileString;
  const [stateId, setStateId] = useState("");
  const [countryId, setCountryId] = useState("");
  const { data: countries, isSuccess } = useFetchCountries();
  const { data: states, isSuccess: stateSuccess } = useFetchStates({
    countryId,
  });
  const { data: lga, isSuccess: lgaSuccess } = useFetchLgas({ stateId });
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
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="last Name"
            rules={textInputValidationRules}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Street address"
            rules={textInputValidationRules}
          >
            <Input placeholder="Enter phone" />
          </Form.Item>

          {/* <Form.Item name="phone" hasFeedback>
            <Input.Group compact>
              <Form.Item
                noStyle
                rules={generalValidationRules}
                name={["phone", "code"]}
              >
                {isCSuccess && (
                  <Select
                    // showSearch
                    // allowClear
                    // optionLabelProp="label"
                    className="rounded border-slate-400"
                    style={{ width: "25%" }}
                    options={countries.map((item) => ({
                      label: `+${item.code}`,
                      value: item.id,
                    }))}
                  />
                )}
              </Form.Item>
              <Form.Item
                noStyle
                rules={textInputValidationRules}
                name={["phone", "number"]}
              >
                <Input
                  style={{ width: "75%" }}
                  placeholder="Business Phone"
                  className="rounded border-slate-400 text-left"
                  autoComplete="phone"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item> */}

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

          <Form.Item label="Upload valid document" name="validDocument">
            <Input
              type="hidden"
              className="generalInputStyle"
              defaultValue={fileUrl}
            />
            <FileUpload
              allowedFileTypes={[
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "image/png"
              ]}
            />
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
              onChange={(val) => setCountryId(val.id)}
            >
              {countries?.map((data: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
                <Option key={data.id} value={data} label={data.name}>
                  {data.name}
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
              onChange={(val) => setStateId(val)}
            >
              {states?.map((data) => (
                <Option key={data.id} value={data.id} label={data.name}>
                  {data.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {lgaSuccess && lga.length > 0 && (
            <Form.Item name="lga" label="LGA" rules={generalValidationRules}>
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                placeholder="Select"
              >
                {lga?.map((data) => (
                  <Option key={data.id} value={data.id} label={data.name}>
                    {data.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
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
