import { Form, Select } from "antd";
import { EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS } from "./columns/myRequestColumns";
import { TableWithFocusType } from "components/table";
import { FormTimeOffPolicyInput } from "../../settings/timeOffPolicy/components/FormTimeOffPolicyInput";
import { useGetTimeOff } from "../hooks/useGetTimeOff";
import { usePagination } from "hooks/usePagination";
import { useState } from "react";

export const MyRequest = () => {
  const columns = EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS();
  const [status, setStatus] = useState<string>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeOff({ pagination, status });

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
        <FormTimeOffPolicyInput Form={Form} control={{ label: "", name: "" }} />
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
