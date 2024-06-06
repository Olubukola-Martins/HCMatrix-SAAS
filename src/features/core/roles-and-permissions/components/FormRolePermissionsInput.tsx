import { Select, Form } from "antd";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useFetchSingleRole } from "../hooks/useFetchSingleRole";
import { TPermission } from "../types";

export const FormRolePermissionsInput: React.FC<{
  handleSelect?: (val: number) => void;
  roleId: number;
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, roleId, handleSelect }) => {
  const [searchedData, setSearchedData] = useState<TPermission[]>();
  const { data, isSuccess } = useFetchSingleRole({
    id: roleId,
  });

  const handleDataSearch = (val: string) => {
    if (isSuccess && data?.permissions) {
      if (val.length > 0) {
        const sData = data?.permissions
          .filter(
            (item) =>
              item.permission.name.toLowerCase().indexOf(val.toLowerCase()) !==
              -1
          )
          .map((item) => item.permission);
        setSearchedData(sData);
      } else {
        setSearchedData([]);
      }
    }
  };
  const mainData: TPermission[] | undefined = !!searchedData
    ? searchedData
    : data?.permissions?.map((item) => item.permission);

  return (
    <Form.Item
      name={control?.name ?? "permissionIds"}
      label={showLabel ? control?.label ?? "Permissions" : null}
      rules={generalValidationRules}
    >
      <Select
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        mode="tags"
        onSelect={handleSelect}
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
