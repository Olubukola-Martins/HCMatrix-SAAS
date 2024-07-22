import { TableWithFocusType } from "components/table";
import { EMPLOYEE_ALL_LOAN_TABLE_COLUMNS } from "./colomns";

const AllLoanRequests = () => {
  const columns = EMPLOYEE_ALL_LOAN_TABLE_COLUMNS();
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

export default AllLoanRequests;
