import { Select, Spin } from "antd";
import { useFetchEmployees } from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { generalValidationRules } from "FormHelpers/validation";
import { useDebounce } from "Hooks/useDebounce";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";

export const FormEmployeeInput: React.FC<{
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control }) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isSuccess } = useFetchEmployees({
    companyId,
    searchParams: {
      name: debouncedSearchTerm,
    },

    token,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "employeeId"}
      label={showLabel ? control?.label ?? "Employee" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select user"
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
      >
        {isSuccess ? (
          data.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.firstName} {item.lastName}
            </Select.Option>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <Spin size="small" />
          </div>
        )}
      </Select>
    </Form.Item>
  );
};
