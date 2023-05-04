import { Input, Select } from "antd";
import { useFetchCountries } from "hooks/useFetchCountries";

import React, { useState } from "react";
import { TCountry } from "types/country";
import {
  generalValidationRules,
  textInputValidationRules,
  phoneNumberValidationRule,
} from "utils/formHelpers/validation";

export const FormPhoneInput: React.FC<{ Form: any; showLabel?: boolean }> = ({
  Form,
  showLabel = true,
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
        console.log(sCountries);
        setSearchedCountries(sCountries);
      } else {
        setSearchedCountries([]);
      }
    }
  };

  const mainCountries = !!searchedCountries ? searchedCountries : countries;
  if (isSuccess) {
    return (
      <Form.Item name="phone" label={showLabel ? "Phone Number" : null}>
        <Input.Group compact>
          <Form.Item
            noStyle
            rules={generalValidationRules}
            name={["phone", "code"]}
          >
            <Select
              showSearch
              allowClear
              onClear={() => setSearchedCountries([])}
              onSearch={handleCountrySearch}
              className="rounded border-slate-400"
              style={{ width: "35%" }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              options={mainCountries?.map((item) => ({
                label: `${item.name}`,
                value: item.code,
              }))}
            />
          </Form.Item>
          <Form.Item
            noStyle
            rules={[...textInputValidationRules, phoneNumberValidationRule]}
            name={["phone", "number"]}
          >
            <Input
              style={{ width: "65%" }}
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
