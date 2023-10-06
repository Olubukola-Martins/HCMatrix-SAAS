import { Table } from "antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { TEmployee } from "../../types";
import { EMPLOYEE_TABLE_COLUMNS } from "./employeeTableColumns";

interface IProps {
  employees: TEmployee[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  rowSelection: TableRowSelection<TEmployee>;
  onChange?: TableProps<TEmployee>["onChange"];
}

const ActiveEmpTableView = ({
  employees,
  loading,
  pagination,
  rowSelection,
  onChange,
}: IProps) => {
  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={EMPLOYEE_TABLE_COLUMNS}
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
