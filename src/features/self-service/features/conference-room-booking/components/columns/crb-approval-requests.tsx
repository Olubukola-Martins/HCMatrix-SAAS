import { Space, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { TConfirmApprovalActionProps } from "hooks/useApproveORReject";
import moment from "moment";
import { AiOutlineMore } from "react-icons/ai";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

export const CRB_APPROVAL_REQUESTS_TABLE_COLUMNS = (
  confirmApprovalAction: (val: TConfirmApprovalActionProps) => void,
  setRequest: (val: TApprovalRequest) => void,
  setShowD: (val: boolean) => void
): ColumnsType<TApprovalRequest> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (val, item) => (
      <span>{getEmployeeFullName(item.conferenceRoomBooking?.employee)}</span>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (val, item) =>
      moment(item.conferenceRoomBooking?.createdAt).format(DEFAULT_DATE_FORMAT),
  },
  {
    title: "Room Name",
    dataIndex: "roomName",
    key: "roomName",
    render: (_, item) => (
      <span>{item.conferenceRoomBooking?.conferenceRoom.name}</span>
    ),

    // ellipsis: true,

    // width: 100,
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    ellipsis: true,
    render: (_, item) => <span>{item.conferenceRoomBooking?.reason}</span>,

    // width: 100,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (_, item) => (
      <span>{item.conferenceRoomBooking?.department?.name ?? "N/A"}</span>
    ),
  },
  {
    title: "Meeting Date",
    dataIndex: "date",
    key: "date",
    render: (val, item) =>
      moment(item.conferenceRoomBooking?.date).format(DEFAULT_DATE_FORMAT),
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    key: "startTime",
    render: (_, item) =>
      moment(item.conferenceRoomBooking?.startTime).format("h:mm:ss"),
  },

  {
    title: "End Time",
    dataIndex: "endTime",
    key: "endTime",
    render: (_, item) =>
      moment(item.conferenceRoomBooking?.endTime).format("h:mm:ss"),
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
                hidden={item.conferenceRoomBooking?.status !== "pending"}
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
                hidden={item.conferenceRoomBooking?.status !== "pending"}
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
