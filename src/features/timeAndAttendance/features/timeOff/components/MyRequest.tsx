import { Form, Select } from "antd";
import { EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS } from "./columns/myRequestColumns";
import { TableWithFocusType } from "components/table";
import { FormTimeOffPolicyInput } from "../../settings/timeOffPolicy/components/FormTimeOffPolicyInput";
import {
  QUERY_KEY_FOR_MY_TIME_OFF_REQUEST,
  useGetTimeOff,
} from "../hooks/useGetTimeOff";
import { usePagination } from "hooks/usePagination";
import { useState } from "react";
import { useHandleTimeAndAttendanceStatus } from "features/timeAndAttendance/hooks/useHandleTimeAndAttendanceStatus";
import { useCancelTimeOffRequest } from "../hooks/useCancelTimeOffRequest";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

export const MyRequest = () => {
  const { mutate, isLoading: loadCancel } = useCancelTimeOffRequest();
  const { requestType } = useHandleTimeAndAttendanceStatus({
    queryKey: QUERY_KEY_FOR_MY_TIME_OFF_REQUEST,
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
          queryKey: [QUERY_KEY_FOR_MY_TIME_OFF_REQUEST],
        });
      },
    });
  };

  const columns = EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS({
    handleDelete,
    approvalColumn: false,
  });

  const [status, setStatus] = useState<string>();
  const [policyId, setPolicyId] = useState<number>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeOff({ pagination, status, policyId });

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
