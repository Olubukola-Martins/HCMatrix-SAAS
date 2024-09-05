import { TShiftSwapRequest } from "../types";
import { ColumnsType } from "antd/lib/table";
import { Dropdown } from "antd";
import { TableWithFocusType } from "components/table";
import { usePagination } from "hooks/usePagination";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useState } from "react";
import { ViewShiftSwapRequest } from "./ViewShiftSwapRequest";
import { useGetMyShiftSwapRequest } from "../hooks/useGetMyShiftSwapRequest";
import { CancelShiftSwapRequest } from "./CancelShiftSwapRequest";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "view" | "cancel" | "view-stages";
export const MyRequest = () => {
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetMyShiftSwapRequest({
    pagination,
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
          {item.status}{" "}
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
                {
                  label: "Cancel",
                  key: "cancel",
                  type: "item",
                  onClick: () => handleAction("cancel", item),
                },
                {
                  label: "View Approval Stages",
                  key: "stages",
                  type: "item",
                  onClick: () => handleAction("view-stages", item),
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
      <CancelShiftSwapRequest
        handleClose={onClose}
        open={action === "cancel"}
        data={request}
      />
      <ViewApprovalStages
        handleClose={onClose}
        open={action === "view-stages"}
        id={request?.id ?? 0}
        type="shift-swap"
      />
      <div>
        <TableWithFocusType
          className="mt-3"
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
