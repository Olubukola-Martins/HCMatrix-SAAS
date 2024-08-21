import { DatePicker, Form, Select } from "antd";
import { EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS } from "./columns/myRequestColumns";
import { TableWithFocusType } from "components/table";
import { FormTimeOffPolicyInput } from "../../settings/timeOffPolicy/components/FormTimeOffPolicyInput";
import { useGetTimeOff } from "../hooks/useGetTimeOff";
import { usePagination } from "hooks/usePagination";
import { useState } from "react";
import { statusItems } from "../constance";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

export const MyRequest = () => {
  const [status, setStatus] = useState<string>();
  const [policyId, setPolicyId] = useState<number>();
  const [timeOffId, setTimeOffId] = useState<number>();
  const [openViewStages, setOpenViewStages] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeOff({
    pagination,
    status,
    policyId,
    date: selectedDate,
  });

  const handleViewStages = (id: number) => {
    setOpenViewStages(true);
    setTimeOffId(id);
  };

  const columns = EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS({
    // handleDelete,
    extraColumns: false,
    handleViewStages,
  });

  return (
    <div>
      <ViewApprovalStages
        handleClose={() => setOpenViewStages(false)}
        open={openViewStages}
        id={timeOffId ?? 0}
        type="time-off"
      />

      <div className="flex items-center gap-4 mt-3">
        <Select
          options={statusItems}
          placeholder="Status"
          onChange={(val) => setStatus(val)}
          allowClear
          className="w-[8rem] -mt-6"
        />
        <FormTimeOffPolicyInput
          Form={Form}
          control={{ label: "", name: "" }}
          handleSelect={(_, val) => setPolicyId(val?.id)}
        />
        <div className="-mt-6">
          <DatePicker
            className="w-full"
            style={{ width: "8rem" }}
            onChange={(val) =>
              setSelectedDate(val ? val.format("YYYY-MM-DD") : null)
            }
          />
        </div>
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
