import { usePagination } from "hooks/usePagination";
import { useGetSwapPartnerApprovals } from "../hooks/useGetSwapPartnerApprovals";
import { ColumnsType } from "antd/es/table";
import { ISwapPartnerApprovals } from "../types";
import { Dropdown } from "antd";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TableWithFocusType } from "components/table";
import { useState } from "react";
import { PartnersApprovalModal } from "./PartnersApprovalModal";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

interface IRequestType {
  id: number;
  status: string;
}

export const MySwapPartnerApprovals = () => {
  const { pagination, onChange } = usePagination();
  const [openApproval, setOpenApproval] = useState(false);
  const [getIdAndRequestStatus, setGetIdAndRequestStatus] =
    useState<IRequestType>();
  const { data, isFetching } = useGetSwapPartnerApprovals({
    pagination,
    status: "",
  });

  const handleRequestStatus = (id: number, status: string) => {
    setGetIdAndRequestStatus({ id, status });
    setOpenApproval(true);
  };

  const onClose = () => {
    setGetIdAndRequestStatus(undefined);
    setOpenApproval(false);
  };

  const columns: ColumnsType<ISwapPartnerApprovals> = [
    {
      title: "Requester name",
      key: "RequesterName",
        render: (_, item) => (
          <span className="capitalize">
            {getEmployeeFullName(item?.shiftSwap?.employee)}
          </span>
        ),
    },
    {
      title: "Requester previous shift",
      key: "RequesterPreviousShift",
        render: (_, item) => (
          <span className="capitalize">{item?.shiftSwap?.shiftFrom?.name}</span>
        ),
    },
    {
      title: "Requesting shift",
      key: "RequestingShift",
        render: (_, item) => (
          <span className="capitalize">{item?.shiftSwap?.shiftTo?.name}</span>
        ),
    },
    {
      title: "Reason",
      key: "reason",
      render: (_, item) => (
        <span>{item?.shiftSwap?.reason}</span>
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
                  label: "Accept",
                  key: "Accept",
                  type: "item",
                    onClick: () => handleRequestStatus(item.id, "approved"),
                },
                {
                  label: "Reject",
                  key: "Reject",
                  type: "item",
                  onClick: () => handleRequestStatus(item.id, "rejected"),
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
    <div>
      <PartnersApprovalModal
        open={openApproval}
        handleClose={() => onClose()}
        id={getIdAndRequestStatus?.id ?? 0}
        status={getIdAndRequestStatus?.status ?? ""}
      />
      <TableWithFocusType
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
