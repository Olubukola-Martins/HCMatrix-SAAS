import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import moment from "moment";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TAllWorkflow } from "../types/allWorkflows";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

interface IProps {
  data: TAllWorkflow[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TAllWorkflow>["onChange"];
}

export const WorkflowsTable = ({
  data,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const columns: ColumnsType<TAllWorkflow> = [
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
          {val.lastModifiedBy.firstName} {val.lastModifiedBy.lastName}
        </span>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => (
        <div className="flex items-center gap-3 text-lg">
          <Link to={appRoutes.editWorkflow(item.id).path}>
            <i className="ri-pencil-line cursor-pointer hover:text-caramel" />
          </Link>
          {/* <i className="ri-delete-bin-line cursor-pointer hover:text-caramel" /> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};
