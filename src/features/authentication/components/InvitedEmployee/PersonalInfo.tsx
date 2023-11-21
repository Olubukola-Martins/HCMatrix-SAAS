import { DatePicker, Form, Input, Select } from "antd";

import { BeatLoader } from "react-spinners";
import { useContext, useState } from "react";
import { GlobalContext } from "stateManagers/GlobalContextProvider";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { useFetchCountries } from "hooks/useFetchCountries";
import { useFetchLgas } from "hooks/useFetchLGAs";
import { useFetchStates } from "hooks/useFetchStates";
import { stepperInputProps } from "features/authentication/types";
const { Option } = Select;

export const PersonalInfo = ({
  onFinished,
  initialValues,
  setCurrent,
  isLoading,
  form,
}: stepperInputProps) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const fileUrl = globalState.upLoadFileString;
  const [stateId, setStateId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const { data: countries, isSuccess } = useFetchCountries();
  const { data: states, isSuccess: stateSuccess } = useFetchStates({
    countryId,
  });
  const { data: lga, isSuccess: lgaSuccess } = useFetchLgas({ stateId });
  const [hiddenInputs, setHiddenInputs] = useState("");
  const handleCitizen = (val: string) => {
    setHiddenInputs(val);
  };
  const citizenCheck = hiddenInputs === "expatriate" ? false : true;

  return (
    <div>
      <Form
        onFinish={onFinished}
        initialValues={initialValues}
        layout="vertical"
        requiredMark={false}
        form={form}
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
            name="streetAddress"
            label="Street address"
            rules={textInputValidationRules}
          >
            <Input placeholder="No 2 United Estate" />
          </Form.Item>

          <Form.Item name="phone" label="Business phone">
            <Input.Group compact>
              <Form.Item
                noStyle
                rules={generalValidationRules}
                name={["phone", "code"]}
                initialValue="+234"
              >
                {isSuccess && (
                  <Select
                    className="rounded border-slate-400"
                    style={{ width: "30%" }}
                    options={countries?.map((item) => ({
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
                  style={{ width: "70%" }}
                  placeholder="9036849235"
                  className="rounded border-slate-400 text-left"
                  autoComplete="phone"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={generalValidationRules}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
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
            name="eligibility"
            label="Employment Eligibility"
            rules={generalValidationRules}
          >
            <Select placeholder="Select" onChange={handleCitizen}>
              <Option value="citizen">Citizen</Option>
              <Option value="expatriate">Expatriate</Option>
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

          {/* <Form.Item label="Upload valid document" name="validDocumentUrl">
            <Input
              type="hidden"
              className="generalInputStyle"
              defaultValue={fileUrl}
            />
            <FileUpload
              allowedFileTypes={[
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "image/png",
              ]}
            />
          </Form.Item> */}

          <Form.Item
            name="countryId"
            label="Nationality"
            rules={generalValidationRules}
          >
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              placeholder="Select"
              onChange={(val) => setCountryId(val)}
            >
              {countries?.map((data) => (
                <Option key={data.id} value={data.id} label={data.name}>
                  {data.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="stateId"
            label="State"
            rules={generalValidationRules}
          >
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
            <Form.Item name="lgaId" label="LGA" rules={generalValidationRules}>
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
            {isLoading ? <BeatLoader color="#fff" /> : "Continue"}
          </button>
        </div>
      </Form>
    </div>
  );
};
