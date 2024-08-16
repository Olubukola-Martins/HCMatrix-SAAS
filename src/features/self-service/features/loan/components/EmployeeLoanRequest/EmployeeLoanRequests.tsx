import { TableWithFocusType } from "components/table";
import { EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS } from "./columns";
import { useGetLoanRequests } from "../../hooks/requests/useGetLoanRequests";
import { usePagination } from "hooks/usePagination";
import { DeleteLoanRequest } from "./DeleteLoanRequest";
import { useState } from "react";
import {
  EmployeeLoanRequestTableActions,
  TLoanRequestStatus,
} from "../../types/request";
import { LoanDetails } from "../AllLoans/LoanDetails";
import { DatePicker, Select } from "antd";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

const EmployeeLoanRequests = () => {
  const [loanRequestId, setLoanRequestId] = useState<number>();
  const [useOpenDelete, setUseOpenDelete] = useState(false);
  const [openLoanDetails, setOpenLoanDetails] = useState(false);
  const [openStageModal, setOpenStageModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const [storeStatus, setStoreStatus] = useState<TLoanRequestStatus[]>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetLoanRequests({
    props: {
      pagination: pagination,
      date: selectedDate ?? "",
      status: storeStatus ?? [],
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

  const handleLoanApprovalStages = (id: number) => {
    setLoanRequestId(id);
    setOpenStageModal(true);
  };

  const actions: EmployeeLoanRequestTableActions = {
    handleLoanTypeDelete,
    handleLoanDetails,
    handleLoanApprovalStages
    // You can add more functions here
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
        id={loanRequestId ?? 0}
        loanDetailSource="my-loan-request"
      />

      <ViewApprovalStages
        handleClose={() => setOpenStageModal(false)}
        open={openStageModal}
        id={loanRequestId ?? 0}
        type="loan"
      />

      <div className="flex items-center gap-3">
        <DatePicker
          className="w-full"
          style={{ width: "12rem" }}
          onChange={(val) =>
            setSelectedDate(val ? val.format("YYYY-MM-DD") : null)
          }
        />
        <Select
          placeholder="Filter by status"
          options={APPROVAL_STATUS_OPTIONS}
          mode="multiple"
          onChange={(val) => setStoreStatus(val)}
          style={{ width: "8rem" }}
        />
      </div>

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
