import { ColumnsType } from "antd/es/table";
import { ITimeOffProps } from "../../types";
import { Dropdown, Menu } from "antd";

export const EMPLOYEE_TIMEOFF_REQUEST_TABLE_COLUMNS =
  (): ColumnsType<ITimeOffProps> => [
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
                <Menu.Item key="1">Edit</Menu.Item>
                <Menu.Item key="2">Cancel</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];
