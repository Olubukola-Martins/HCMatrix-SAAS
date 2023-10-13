import { Input, Select } from "antd";
import { useFetchCountries } from "hooks/useFetchCountries";

import React, { useState } from "react";
import { TCountry } from "types/country";
import {
  generalValidationRules,
  textInputValidationRules,
  phoneNumberValidationRule,
  generalValidationRulesOp,
  phoneNumberValidationRuleOp,
} from "utils/formHelpers/validation";

export const FormPhoneInput: React.FC<{
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
  optional?: boolean;
}> = ({
  Form,
  showLabel = true,
  control = { label: "Phone Number", name: "phone" },
  optional = false,
}) => {
  const { data: countries, isSuccess } = useFetchCountries();
  const [searchedCountries, setSearchedCountries] = useState<TCountry[]>();

  const handleCountrySearch = (val: string) => {
    if (isSuccess) {
      if (val.length > 0) {
        const sCountries = countries.filter(
          (item) =>
            item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
            `+${item.code}`.toLowerCase().indexOf(`${val.toLowerCase()}`) !== -1
        );
        setSearchedCountries(sCountries);
      } else {
        setSearchedCountries([]);
      }
    }
  };

  const mainCountries = !!searchedCountries ? searchedCountries : countries;
  if (isSuccess) {
    return (
      <Form.Item name={control.name} label={showLabel ? control?.label : null}>
        <Input.Group compact>
          <Form.Item
            noStyle
            rules={optional ? generalValidationRulesOp : generalValidationRules}
            name={[control.name, "code"]}
          >
            <Select
              showSearch
              allowClear
              onClear={() => setSearchedCountries([])}
              onSearch={handleCountrySearch}
              className="rounded border-slate-400"
              style={{ width: "25%" }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              options={mainCountries?.map((item) => ({
                label: `+${item.code}`,
                value: item.code,
              }))}
            />
          </Form.Item>
          <Form.Item
            noStyle
            rules={
              optional
                ? [phoneNumberValidationRuleOp]
                : [phoneNumberValidationRule]
            }
            name={[control.name, "number"]}
          >
            <Input
              style={{ width: "75%" }}
              placeholder="Phone"
              className="rounded border-slate-400 text-left"
              autoComplete="phone"
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    );
  }
  return null;
};
