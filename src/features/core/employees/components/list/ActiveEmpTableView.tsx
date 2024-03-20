import { Table } from "antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import { TEmployee } from "../../types";
import { EMPLOYEE_TABLE_COLUMNS } from "./employeeTableColumns";
export type TActiveEmpTableViewProps = {
  employees: TEmployee[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  rowSelection: TableRowSelection<TEmployee>;
  onChange?: TableProps<TEmployee>["onChange"];
  columns?: ColumnsType<TEmployee>;
};

const ActiveEmpTableView = ({
  employees,
  loading,
  pagination,
  rowSelection,
  onChange,
  columns = EMPLOYEE_TABLE_COLUMNS,
}: TActiveEmpTableViewProps) => {
  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={employees.map((item) => ({ ...item, key: item.id }))}
        scroll={{ x: "max-content" }}
        loading={loading}
        className="mt-5"
        size="small"
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};

export default ActiveEmpTableView;
