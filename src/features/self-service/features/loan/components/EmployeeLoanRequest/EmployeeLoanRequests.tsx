import { TableWithFocusType } from "components/table";
import { EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS } from "./columns";

const EmployeeLoanRequests = () => {
  const columns = EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS();
  return (
    <div>
      <TableWithFocusType
        columns={columns}
        dataSource={[]}
        // loading={isLoading}
        // pagination={{ ...pagination, total: data?.total }}
        // onChange={onChange}
        scroll={{ x: 500 }}
      />
    </div>
  );
};

export default EmployeeLoanRequests;
