import { useState } from "react";
import { useGetAllTimeOffRequest } from "../hooks/useGetAllTimeOffRequest";
import { TableWithFocusType } from "components/table";
import { ColumnsType } from "antd/es/table";
import { ITimeOffProps } from "../types";
import { usePagination } from "hooks/usePagination";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { DatePicker, Form, Select } from "antd";
import { statusItems } from "../constance";
import { FormTimeOffPolicyInput } from "../../settings/timeOffPolicy/components/FormTimeOffPolicyInput";

export const AllTimeOffRequest = () => {
  const [status, setStatus] = useState<string>();
  const [policyId, setPolicyId] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetAllTimeOffRequest({
    pagination,
    status,
    policyId,
    date: selectedDate,
  });

  const columns: ColumnsType<ITimeOffProps> = [
    {
      title: "Name",
      key: "employee",
      render: (_, item) => (
        <span className="capitalize">{getEmployeeFullName(item.employee)}</span>
      ),
    },
    {
      title: "Time off Policy",
      key: "timeOffPolicy",
      render: (_, val) => <span>{val.policy?.title}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Duration in hours",
      key: "duration",
      render: (_, val) => <span>{val.policy?.duration}</span>,
    },

    {
      title: "Start Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Department",
      key: "department",
      render: (_, item) => (
        <span className="capitalize">
          {item?.employee?.designation?.department?.name}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => {
        if (!item || !item.status) {
          return null;
        }
        return (
          <span
            style={{ color: getAppropriateColorForStatus(item.status) }}
            className="capitalize"
          >
            {item.status}
          </span>
        );
      },
    },
    {
      title: "Reasons",
      dataIndex: "comment",
      key: "comment",
    },
  ];

  return (
    <div>
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
          handleClear={() => setPolicyId(undefined)}
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
