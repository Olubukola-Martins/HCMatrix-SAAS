import { TableWithFocusType } from "components/table";
import { EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS } from "./columns";
import { useGetLoanRequests } from "../../hooks/requests/useGetLoanRequests";
import { usePagination } from "hooks/usePagination";

const EmployeeLoanRequests = () => {
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const {data, isLoading} = useGetLoanRequests({
    props: {
      pagination: pagination,
    },
  });
  const columns = EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS();
  return (
    <div>
      <TableWithFocusType
        columns={columns}
        dataSource={data?.data}
         loading={isLoading}
         pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        scroll={{ x: 500 }}
      />
    </div>
  );
};

export default EmployeeLoanRequests;
