import { ColumnsType } from "antd/lib/table";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { TAllWorkflow } from "../../types/allWorkflows";

export const WORKFLOW_TABLE_COLUMNS = (): ColumnsType<TAllWorkflow> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Number of stages",
    dataIndex: "numberOfStages",
    key: "numberOfStages",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (_, item) => <span className="capitalize">{item.type}</span>,
  },
  {
    title: "Last modified",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (val) => moment(val).format(DEFAULT_DATE_FORMAT),
  },
  {
    title: "Last modified by",
    dataIndex: "lastModifier",
    key: "lastModifier",
    render: (_, val) => (
      <span className="capitalize">
        {getEmployeeFullName(val.lastModifiedBy)}
      </span>
    ),
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, item) => (
      <div className="flex items-center gap-3 text-lg">
        <Link to={appRoutes.editWorkflow(item.id).path}>
          <i className="ri-pencil-line cursor-pointer hover:text-caramel" />
        </Link>
      </div>
    ),
  },
];
export const WORKFLOW_EXPORT_COLUMNS = (
  items?: TAllWorkflow[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Name: item.name,
      "Number of stages": item.numberOfStages,
      Type: item.type,
      "Last modified": moment(item.updatedAt).format(DEFAULT_DATE_FORMAT),
      "Last modified By": getEmployeeFullName(item.lastModifiedBy),
    })) ?? []
  );
};
