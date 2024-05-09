import { Dropdown, Menu, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { AiOutlineMore } from "react-icons/ai";
import { TConfirmApprovalActionProps } from "hooks/useApproveORReject";

export const VEHICLE_BOOKING_APPROVAL_REQUEST_TABLE_COLUMNS = (
  confirmApprovalAction: (val: TConfirmApprovalActionProps) => void,
  setRequest: (val: TApprovalRequest) => void,
  setShowD: (val: boolean) => void
): ColumnsType<TApprovalRequest> => [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (val, item) =>
      moment(item.vehicleBooking?.createdAt).format(DEFAULT_DATE_FORMAT),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (val, item) => (
      <span>{getEmployeeFullName(item.vehicleBooking?.employee)}</span>
    ),
  },

  {
    title: "Employee ID",
    dataIndex: "Employee ID",
    key: "Employee ID",
    render: (_, item) => <span>{item.vehicleBooking?.employee.empUid}</span>,
  },

  //   {
  //     title: "Department",
  //     dataIndex: "department",
  //     key: "department",
  //     render: (_, item) => <span>{"N/A"}</span>,
  //   },
  {
    title: "Destination",
    dataIndex: "Destination",
    key: "Destination",
    render: (_, item) => <span>{item.vehicleBooking?.destination}</span>,
  },

  {
    title: "Duration(hrs)",
    dataIndex: "endTime",
    key: "endTime",
    render: (_, item) => item.vehicleBooking?.duration,
  },

  {
    title: "Status",
    dataIndex: "status",

    key: "status",
    render: (val: string) => (
      <span
        className="capitalize"
        style={{ color: getAppropriateColorForStatus(val) }}
      >
        {val}
      </span>
    ),
  },

  {
    title: "Action",
    key: "action",
    width: 100,
    render: (_, item) => (
      <Space align="center" className="cursor-pointer">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="3"
                onClick={() => {
                  setShowD(true);
                  setRequest(item);
                }}
              >
                View
              </Menu.Item>
              <Menu.Item
                hidden={item.vehicleBooking?.status !== "pending"}
                key="2"
                onClick={() =>
                  confirmApprovalAction({
                    approvalStageId: item?.id,
                    status: "approved",
                    workflowType: !!item?.basicStageId ? "basic" : "advanced",
                    requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                  })
                }
              >
                Approve
              </Menu.Item>
              <Menu.Item
                hidden={item.vehicleBooking?.status !== "pending"}
                key="1"
                onClick={() =>
                  confirmApprovalAction({
                    approvalStageId: item?.id,
                    status: "rejected",
                    workflowType: !!item?.basicStageId ? "basic" : "advanced",
                  })
                }
              >
                Reject
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <AiOutlineMore />
        </Dropdown>
      </Space>
    ),
  },
];
