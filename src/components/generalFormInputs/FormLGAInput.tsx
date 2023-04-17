import { Select } from "antd";
import { useFetchLgas } from "hooks/useFetchLGAs";
import { useState } from "react";
import { TLga } from "types/lgas";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormLGAInput: React.FC<{
  stateId: number;
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, stateId }) => {
  const [searchedData, setSearchedData] = useState<TLga[]>();

  const { data, isSuccess } = useFetchLgas({ stateId });

  const handleDataSearch = (val: string) => {
    if (isSuccess) {
      if (val.length > 0) {
        const sData = data.filter(
          (item) => item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
        );
        console.log(sData);
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
      name={control?.name ?? "lgaId"}
      label={showLabel ? control?.label ?? "LGA" : null}
      rules={generalValidationRules}
      dependencies={["stateId"]}
    >
      <Select
        showSearch
        allowClear
        onClear={() => setSearchedData([])}
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
