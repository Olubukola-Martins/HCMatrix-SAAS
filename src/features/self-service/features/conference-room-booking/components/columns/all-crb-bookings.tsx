import { Space, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TSingleConferenceRoomBooking } from "../../types";
import { TCRBHistoryAction } from "../CRBHistoryTable";
import { AiOutlineMore } from "react-icons/ai";

export const ALL_CRB_BOOKINGS_TABLE_COLUMNS = (
  handleAction: (
    key: TCRBHistoryAction,
    item?: TSingleConferenceRoomBooking
  ) => void
): ColumnsType<TSingleConferenceRoomBooking> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (val, item) => <span>{getEmployeeFullName(item.employee)}</span>,

    ellipsis: true,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (val, item) => moment(item.createdAt).format(DEFAULT_DATE_FORMAT),
  },
  {
    title: "Room Name",
    dataIndex: "roomName",
    key: "roomName",
    render: (_, item) => (
      <span className="capitalize">{item.conferenceRoom.name}</span>
    ),

    // ellipsis: true,

    // width: 100,
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    ellipsis: true,

    // width: 100,
  },

  {
    title: "Meeting Date",
    dataIndex: "date",
    key: "date",
    render: (val) => moment(val).format(DEFAULT_DATE_FORMAT),
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    key: "startTime",
    render: (val) => moment(val).format("h:mm:ss"),
  },

  {
    title: "End Time",
    dataIndex: "endTime",
    key: "endTime",
    render: (val) => moment(val).format("h:mm:ss"),
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
                key="4"
                onClick={() => {
                  handleAction("view-approval-stages", item);
                }}
              >
                View Stages
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  handleAction("view", item);
                }}
              >
                View
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
