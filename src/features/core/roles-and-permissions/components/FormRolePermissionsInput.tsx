import { Select } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useFetchSingleRole } from "../hooks/useFetchSingleRole";
import { TPermission } from "../types";

export const FormRolePermissionsInput: React.FC<{
  handleSelect?: (val: number) => void;
  roleId: number;
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, roleId, handleSelect }) => {
  const [searchedData, setSearchedData] = useState<TPermission[]>();
  const { companyId, token } = useApiAuth();
  const { data, isSuccess } = useFetchSingleRole({
    id: roleId,
    companyId,
    token,
  });

  const handleDataSearch = (val: string) => {
    if (isSuccess && data?.permissions) {
      if (val.length > 0) {
        const sData = data?.permissions.filter(
          (item) => item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
        );
        setSearchedData(sData);
      } else {
        setSearchedData([]);
      }
    }
  };
  const mainData = !!searchedData ? searchedData : data?.permissions;

  return (
    <Form.Item
      name={control?.name ?? "permissionIds"}
      label={showLabel ? control?.label ?? "Permissions" : null}
      rules={generalValidationRules}
    >
      <Select
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
          value: item.permissionId,
        }))}
      />
    </Form.Item>
  );
};
