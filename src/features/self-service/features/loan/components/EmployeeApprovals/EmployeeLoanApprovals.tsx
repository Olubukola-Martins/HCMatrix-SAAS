import { TableWithFocusType } from "components/table";
import { EMPLOYEE_LOAN_APPROVAL_TABLE_COLUMNS } from "./columns";
import { usePagination } from "hooks/usePagination";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useState } from "react";
import { EmployeeLoanRequestTableActions } from "../../types/request";
import { LoanDetails } from "../AllLoans/LoanDetails";
import { LoanDisbursement } from "./LoanDisbursement";
import { useQueryClient } from "react-query";
import { useApproveORReject } from "hooks/useApproveORReject";
import { QUERY_KEY_FOR_LOAN_REQUESTS } from "../../hooks/requests/useGetLoanRequests";
import { QUERY_KEY_FOR_ALL_LOAN_REQUESTS } from "../../hooks/requests/useGetAllLoans";

const EmployeeLoanApprovals = () => {
  const queryClient = useQueryClient();
  const [loanRequestId, setLoanRequestId] = useState<number>();
  const [openLoanDetails, setOpenLoanDetails] = useState(false);
  const [openDisburse, setOpenDisburse] = useState(false);
  const { pagination, onChange } = usePagination();
  const { data, isLoading } = useFetchApprovalRequests({
    pagination,
    type: "loan",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_LOAN_REQUESTS],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_ALL_LOAN_REQUESTS],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [],
        // exact: true,
      });
    },
  });

  const handleLoanDetails = (id: number) => {
    setLoanRequestId(id);
    setOpenLoanDetails(true);
  };
  const handleLoanDisbursement = (id: number) => {
    setLoanRequestId(id);
    setOpenDisburse(true);
  };
  const actions: EmployeeLoanRequestTableActions = {
    handleLoanDetails,
    handleLoanDisbursement,
    confirmApprovalAction,

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
