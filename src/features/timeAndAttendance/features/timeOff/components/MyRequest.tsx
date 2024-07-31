import { DatePicker, Form, Select } from "antd";
import { EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS } from "./columns/myRequestColumns";
import { TableWithFocusType } from "components/table";
import { FormTimeOffPolicyInput } from "../../settings/timeOffPolicy/components/FormTimeOffPolicyInput";
import { QUERY_KEY_FOR_TIME_OFF, useGetTimeOff } from "../hooks/useGetTimeOff";
import { usePagination } from "hooks/usePagination";
import { useState } from "react";
import { useHandleTimeAndAttendanceStatus } from "features/timeAndAttendance/hooks/useHandleTimeAndAttendanceStatus";
import { useCancelTimeOffRequest } from "../hooks/useCancelTimeOffRequest";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { statusItems } from "../constance";

export const MyRequest = () => {
  const { mutate, isLoading: loadCancel } = useCancelTimeOffRequest();
  const { requestType } = useHandleTimeAndAttendanceStatus({
    queryKey: QUERY_KEY_FOR_TIME_OFF,
  });
  const queryClient = useQueryClient();

  const handleDelete = (id: number) => {
    if (!id) return;
    mutate(id, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          duration: 2,
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res: any) => {
        openNotification({
          state: "success",
          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_TIME_OFF],
        });
      },
    });
  };

  const columns = EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS({
    handleDelete,
    extraColumns: false,
  });

  const [status, setStatus] = useState<string>();
  const [policyId, setPolicyId] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeOff({
    pagination,
    status,
    policyId,
    date: selectedDate,
  });

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
