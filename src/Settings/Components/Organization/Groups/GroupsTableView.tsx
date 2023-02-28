import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TGroup } from "AppTypes/DataEntitities";
import { Table } from "antd";

interface IProps {
  groups: TGroup[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TGroup>["onChange"];
  editGroup: (val: number) => void;
}
const GroupsGridView = ({
  groups,
  loading,
  pagination,
  onChange,
  editGroup,
}: IProps) => {
  const columns: ColumnsType<TGroup> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Group Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 80,

      render: (_, item) => (
        <div className="flex items-center gap-3 text-lg">
          <i
            className="ri-pencil-line cursor-pointer hover:text-caramel"
            onClick={() => editGroup(item.id as number)}
          ></i>
          <i className="ri-delete-bin-line cursor-pointer hover:text-caramel"></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={groups}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};

export default GroupsGridView;
