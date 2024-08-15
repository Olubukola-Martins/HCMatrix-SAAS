import { TableWithFocusType } from "components/table";
import { EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS } from "./columns";
import { useGetLoanRequests } from "../../hooks/requests/useGetLoanRequests";
import { usePagination } from "hooks/usePagination";
import { DeleteLoanRequest } from "./DeleteLoanRequest";
import { useState } from "react";
import { EmployeeLoanRequestTableActions } from "../../types/request";
import { LoanDetails } from "../AllLoans/LoanDetails";

const EmployeeLoanRequests = () => {
  const [loanRequestId, setLoanRequestId] = useState<number>();
  const [useOpenDelete, setUseOpenDelete] = useState(false);
  const [openLoanDetails, setOpenLoanDetails] = useState(false);
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetLoanRequests({
    props: {
      pagination: pagination,
    },
  });

  const handleLoanTypeDelete = (id: number) => {
    setLoanRequestId(id);
    setUseOpenDelete(true);
  };

  const handleLoanDetails = (id: number) => {
    setLoanRequestId(id);
    setOpenLoanDetails(true);
  };

  const actions: EmployeeLoanRequestTableActions = {
    handleLoanTypeDelete,
    handleLoanDetails,
    // You can add more functions here later
  };

  const columns = EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS(actions);

  return (
    <div>
      <DeleteLoanRequest
        open={useOpenDelete}
        handleClose={() => setUseOpenDelete(false)}
        id={loanRequestId}
      />
      <LoanDetails
        open={openLoanDetails}
        handleClose={() => setOpenLoanDetails(false)}
        id={loanRequestId?? 0}
      />
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
