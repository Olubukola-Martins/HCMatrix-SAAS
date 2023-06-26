import { Select } from "antd";
import { useFetchIndustries } from "hooks/useFetchIndutries";
import { useState } from "react";
import { TIndustry } from "types/industry";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormIndustryInput: React.FC<{
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control }) => {
  const [searchedData, setSearchedData] = useState<TIndustry[]>();

  const { data, isSuccess } = useFetchIndustries();

  const handleDataSearch = (val: string) => {
    if (isSuccess) {
      if (val.length > 0) {
        const sData = data.filter(
          (item) => item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
        );
        setSearchedData(sData);
      } else {
        setSearchedData([]);
      }
    }
  };
  const mainData = !!searchedData ? searchedData : data;

  if (data?.length === 0) {
    return null; //if the state has no lgas then return nothing
  }

  return (
    <Form.Item
      name={control?.name ?? "industryId"}
      label={showLabel ? control?.label ?? "Industry" : null}
      rules={generalValidationRules}
    >
      <Select
        showSearch
        allowClear
        onSearch={handleDataSearch}
        className="rounded border-slate-400"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        options={mainData?.map((item) => ({
          label: `${item.name}`,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
};
