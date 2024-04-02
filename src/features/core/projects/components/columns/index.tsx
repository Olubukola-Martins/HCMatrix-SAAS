import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TProjectListItem } from "../../types";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

export const PROJECT_TABLE_COLUMNS = (): ColumnsType<TProjectListItem> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, item) => (
      <Link to={appRoutes.singleProject(item.id).path}>
        <span className="capitalize text-caramel hover:underline">
          {item.name}
        </span>
      </Link>
    ),
  },

  {
    title: "Participant Count",
    dataIndex: "Participant Count",
    key: "Participant Count",
    render: (_, item) => <span>{item.employeeCount} </span>,
  },
  {
    title: "Project Status",
    dataIndex: "Project Status",
    key: "Project Status",
    render: (_, item) => <span>{item.status} </span>,
  },
  {
    title: "Start Date",
    dataIndex: "Start Date",
    key: "Start Date",
    render: (_, item) => (
      <span>{moment(item.startDate).format(DEFAULT_DATE_FORMAT)} </span>
    ),
  },
  {
    title: "End Date",
    dataIndex: "End Date",
    key: "End Date",
    render: (_, item) => (
      <span>{moment(item.endDate).format(DEFAULT_DATE_FORMAT)} </span>
    ),
  },
];
export const PROJECT_EXPORT_COLUMNS = (
  items?: TProjectListItem[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Name: item.name,

      "Participant Count": item.employeeCount,
      "Project Status": item.status,
      "Start Date": moment(item.startDate).format(DEFAULT_DATE_FORMAT),
      "End Date": moment(item.endDate).format(DEFAULT_DATE_FORMAT),
    })) ?? []
  );
};
