import { Form, Select } from "antd";
import { phoneCodeList } from "../Helpers/phoneCodeList";

const { Option } = Select;

export const PhoneCodePrefix = (disabled: boolean = false) => (
  <Form.Item name="phoneCode" noStyle>
    <Select optionLabelProp="label" disabled={disabled} defaultValue="+234">
      {phoneCodeList.map((data) => (
        <Option key={data.code} value={data.code} label={data.code}>
          {data.code}
        </Option>
      ))}
    </Select>
  </Form.Item>
);
