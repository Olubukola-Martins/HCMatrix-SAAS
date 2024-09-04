import { Form, Select } from "antd";
import React, { useState } from "react";
import { FormTimeOffPolicyInput } from "../../settings/timeOffPolicy/components/FormTimeOffPolicyInput";
import { EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS } from "./columns/myRequestColumns";
import { TableWithFocusType } from "components/table";
import { useGetAllTimeOffRequest } from "../hooks/useGetAllTimeOffRequest";
import { usePagination } from "hooks/usePagination";

export const TimeOffApproval = () => {
    const [status, setStatus] = useState<string>();
    const [policyId, setPolicyId] = useState<number>();
    const { pagination, onChange } = usePagination({ pageSize: 10 });
    const {data, isLoading} = useGetAllTimeOffRequest()
    const columns = EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS({approvalColumn: true});
  return (
    <div>
       <div className="flex items-center gap-4 mt-3">
        <Select
          options={[
            { value: "pending", label: "Pending" },
            { value: "approved", label: "Approved" },
            { value: "rejected", label: "Rejected" },
            { value: "canceled", label: "Canceled" },
          ]}
          placeholder="Status"
          onChange={(val) => setStatus(val)}
          allowClear
          className="w-40 -mt-6"
        />
        <FormTimeOffPolicyInput
          Form={Form}
          control={{ label: "", name: "" }}
          handleSelect={(_, val) => setPolicyId(val?.id)}
        />
      </div>

      <TableWithFocusType
        className="mt-3"
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
