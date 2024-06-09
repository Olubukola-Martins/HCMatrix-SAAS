import { ColumnsType } from "antd/lib/table";
import { THoliday, THolidayAction } from "../../types";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export const HOLIDAY_TABLE_COLUMNS = (
  handleAction: (data: THoliday, action: THolidayAction) => void
): ColumnsType<THoliday> => [
  {
    title: "Holiday Name",
    dataIndex: "name",
    key: "name",
    render: (val, item) => <span className="capitalize">{item.title}</span>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (val, item) => (
      <span className="capitalize text-caramel">
        {dayjs(item.date).format("DD, MMMM")}
      </span>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (val, item) => (
      <span className="capitalize ">
        {dayjs(item.createdAt).format(DEFAULT_DATE_FORMAT)}
      </span>
    ),
  },
  {
    title: "Last Modified",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (val, item) => (
      <span className="capitalize">
        {dayjs(item.updatedAt).format(DEFAULT_DATE_FORMAT)}
      </span>
    ),
  },

  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    render: (_, item) => (
      <Dropdown
        overlay={
          <Menu
            items={[
              {
                label: "Edit",
                key: "Edit",
                onClick: () => handleAction(item, "edit"),
              },
              {
                label: "Delete",
                key: "Delete",
                onClick: () => handleAction(item, "delete"),
              },
            ]}
          />
        }
        children={<MoreOutlined />}
        trigger={["click"]}
      />
    ),
  },
];
export const HOLIDAY_EXPORT_COLUMNS = (
  items?: THoliday[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      "Holiday Name": item.title,

      Date: dayjs(item.date).format("DD, MMMM"),
      "Created At": dayjs(item.createdAt).format(DEFAULT_DATE_FORMAT),
      "Last Modified": dayjs(item.updatedAt).format(DEFAULT_DATE_FORMAT),
    })) ?? []
  );
};
