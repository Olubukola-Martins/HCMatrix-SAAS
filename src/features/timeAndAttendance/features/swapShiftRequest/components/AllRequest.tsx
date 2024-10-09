import { TShiftSwapRequest } from "../types";
import { ColumnsType } from "antd/lib/table";
import { Dropdown } from "antd";
import { TableWithFocusType } from "components/table";
import { useGetGeneralRequest } from "../hooks/useGetGeneralRequest";
import { usePagination } from "hooks/usePagination";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useState } from "react";
import { ViewShiftSwapRequest } from "./ViewShiftSwapRequest";
import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import { TApprovalStatus } from "types/statuses";

type TAction = "view";
export const AllRequest = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetGeneralRequest({
    filter: {
      status,
    },
  });
  const [request, setRequest] = useState<TShiftSwapRequest>();
  const [action, setAction] = useState<TAction>();
  const handleAction = (action: TAction, request?: TShiftSwapRequest) => {
    setAction(action);
    setRequest(request);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };
  const columns: ColumnsType<TShiftSwapRequest> = [
    {
      title: "Date",
      key: "Date",
      render: (_, item) => (
        <span>{dayjs(item.createdAt).format(DEFAULT_DATE_FORMAT)}</span>
      ),
    },
    {
      title: "Name",
      key: "employee",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item?.employee)}
        </span>
      ),
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
      title: "Default Shift",
      key: "defaultShift",
      render: (_, item) => (
        <span className="capitalize">{item.shiftFrom.name}</span>
      ),
    },
    {
      title: "New Shift",
      key: "newShift",
      render: (_, item) => (
        <span className="capitalize">{item.shiftTo.name}</span>
      ),
    },
    {
      title: "Swap partner",
      key: "swapPartner",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item.shiftPartner)}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, item) => (
        <span
          style={{ color: getAppropriateColorForStatus(item.status) }}
          className="capitalize"
        >
          {item.status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <div>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  label: "View",
                  key: "view",
                  type: "item",
                  onClick: () => handleAction("view", item),
                },
              ],
            }}
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];
  return (
    <>
      <ViewShiftSwapRequest
        handleClose={onClose}
        open={action === "view"}
        data={request}
      />
      <div className="mt-5">
        <div className="w-[10rem]">
          <SelectApprovalStatus
            value={status}
            onSelect={setStatus}
            onClear={() => setStatus(undefined)}
          />
        </div>
        <TableWithFocusType
          className="mt-3"
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
          scroll={{ x: 500 }}
        />
      </div>
    </>
  );
};
