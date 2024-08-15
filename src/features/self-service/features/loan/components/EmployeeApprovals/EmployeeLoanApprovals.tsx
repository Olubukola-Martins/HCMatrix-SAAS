import { TableWithFocusType } from "components/table";
import { EMPLOYEE_LOAN_APPROVAL_TABLE_COLUMNS } from "./columns";
import { usePagination } from "hooks/usePagination";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useState } from "react";
import { EmployeeLoanRequestTableActions } from "../../types/request";
import { LoanDetails } from "../AllLoans/LoanDetails";
import { LoanDisbursement } from "./LoanDisbursement";

const EmployeeLoanApprovals = () => {
  const [loanRequestId, setLoanRequestId] = useState<number>();
  const [openLoanDetails, setOpenLoanDetails] = useState(false);
  const [openDisburse, setOpenDisburse] = useState(false);
  const { pagination, onChange } = usePagination();
  const { data, isLoading } = useFetchApprovalRequests({
    pagination,
    type: "loan",
  });

  const handleLoanDetails = (id: number) => {
    setLoanRequestId(id);
    setOpenLoanDetails(true);
  };
  const handleLoanDisbursement = (id: number) => {
    setLoanRequestId(id);
    setOpenLoanDetails(true);
  };
  const actions: EmployeeLoanRequestTableActions = {
    handleLoanDetails,
    handleLoanDisbursement,
    // You can add more functions here
  };
  const columns = EMPLOYEE_LOAN_APPROVAL_TABLE_COLUMNS(actions);

  return (
    <div>
      <LoanDetails
        open={openLoanDetails}
        handleClose={() => setOpenLoanDetails(false)}
        id={loanRequestId ?? 0}
        loanDetailSource="all-loans-request"
      />
      <LoanDisbursement
        open={openDisburse}
        handleClose={() => setOpenDisburse(false)}
        id={loanRequestId}
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

export default EmployeeLoanApprovals;
