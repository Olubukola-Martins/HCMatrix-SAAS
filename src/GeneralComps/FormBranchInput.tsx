import { Select } from "antd";
import { useFetchBranches } from "APIRQHooks/Utility/branchHooks";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { generalValidationRules } from "FormHelpers/validation";
import { useDebounce } from "Hooks/useDebounce";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";

export const FormBranchInput: React.FC<{ Form: any; showLabel?: boolean }> = ({
  Form,
  showLabel = true,
}) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useFetchBranches({
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
      name="branchId"
      label={showLabel ? "Branch" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select branch"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        options={data?.data.map((item) => ({
          label: `${item.name}`,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
};
