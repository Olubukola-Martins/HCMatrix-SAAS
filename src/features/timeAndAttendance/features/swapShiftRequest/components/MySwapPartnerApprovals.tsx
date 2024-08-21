import { usePagination } from "hooks/usePagination";
import { useGetSwapPartnerApprovals } from "../hooks/useGetSwapPartnerApprovals";
import { ColumnsType } from "antd/es/table";
import { ISwapPartnerApprovals } from "../types";
import { Dropdown } from "antd";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TableWithFocusType } from "components/table";

export const MySwapPartnerApprovals = () => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetSwapPartnerApprovals({
    pagination,
    status: "",
  });

  const columns: ColumnsType<ISwapPartnerApprovals> = [
    {
      title: "Requester name",
      key: "RequesterName",
      //   render: (_, item) => (
      //     <span className="capitalize">
      //       {getEmployeeFullName(item?.shiftSwap?.employee)}
      //     </span>
      //   ),
    },
    {
      title: "Requester previous shift",
      key: "RequesterPreviousShift",
      //   render: (_, item) => (
      //     <span className="capitalize">{item.shiftTo.name}</span>
      //   ),
    },
    {
      title: "Requesting shift",
      key: "RequestingShift",
      //   render: (_, item) => (
      //     <span className="capitalize">{item.shiftTo.name}</span>
      //   ),
    },
    {
      title: "Reason",
      key: "reason",
      dataIndex: "comment",
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
                  //   onClick: () => handleAction("view", item),
                },
                {
                  label: "Reject",
                  key: "Reject",
                  type: "item",
                  //   onClick: () => handleAction("cancel", item),
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
