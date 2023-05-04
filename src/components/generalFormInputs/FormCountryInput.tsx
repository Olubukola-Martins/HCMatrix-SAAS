import { Select } from "antd";
import { useFetchCountries } from "hooks/useFetchCountries";
import { useState } from "react";
import { TCountry } from "types/country";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormCountryInput: React.FC<{
  handleSelect?: (val: number) => void;
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, handleSelect }) => {
  const [searchedCountries, setSearchedCountries] = useState<TCountry[]>();

  const { data: countries, isSuccess } = useFetchCountries();

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

  return (
    <Form.Item
      name={control?.name ?? "countryId"}
      label={showLabel ? control?.label ?? "Country" : null}
      rules={generalValidationRules}
    >
      <Select
        onSelect={handleSelect}
        showSearch
        allowClear
        onClear={() => setSearchedCountries([])}
        onSearch={handleCountrySearch}
        className="rounded border-slate-400"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        options={mainCountries?.map((item) => ({
          label: `${item.name}`,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
};
