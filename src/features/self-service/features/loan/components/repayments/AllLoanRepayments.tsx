import { TableWithFocusType } from "components/table";
import { ALL_LOAN_PAYMENT_TABLE_COLUMNS } from "./columns/allLoanPaymentColumn";

const AllLoanRepayments = () => {
  const columns = ALL_LOAN_PAYMENT_TABLE_COLUMNS();
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

export default AllLoanRepayments;
