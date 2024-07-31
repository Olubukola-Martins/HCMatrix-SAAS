import { ColumnsType } from "antd/es/table";
import { IColumnsProps, ITimeOffProps } from "../../types";
import { Dropdown, Menu, Popconfirm } from "antd";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

export const EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS = ({
  handleDelete,
}: IColumnsProps): ColumnsType<ITimeOffProps> => [
  {
    title: "Time off Policy",
    key: "timeOffPolicy",
    render: (_, val) => <span>{val.policy?.title}</span>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Duration in hours",
    key: "duration",
    render: (_, val) => <span>{val.policy?.duration}</span>,
  },

  {
    title: "Start Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, item) => {
      if (!item || !item.status) {
        return null;
      }
      return (
        <span
          style={{ color: getAppropriateColorForStatus(item.status) }}
          className="capitalize"
        >
          {item.status}
        </span>
      );
    },
  },
  {
    title: "Reasons",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "Action",
    key: "action",
    render: (_, val) => (
      <div>
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Popconfirm
                  title={`Cancel ${val.policy?.title}`}
                  onConfirm={() =>
                    handleDelete && handleDelete(val.id as number)
                  }
                >
                  Cancel
                </Popconfirm>
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      </div>
    ),
  },
];
