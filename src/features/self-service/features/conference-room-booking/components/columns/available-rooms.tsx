import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import { TSingleConferenceRoom } from "../../types";

export const CRB_AVAILABLE_ROOMS_TABLE_COLUMNS =
  (): ColumnsType<TSingleConferenceRoom> => [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (_, item) => <span>{item.name}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => moment(val).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val) => moment(val).format(DEFAULT_DATE_FORMAT),
    },
  ];
