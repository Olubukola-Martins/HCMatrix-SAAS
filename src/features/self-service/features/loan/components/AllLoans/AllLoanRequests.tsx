import { TableWithFocusType } from "components/table";
import { EMPLOYEE_ALL_LOAN_TABLE_COLUMNS } from "./colomns";
import { useGetAllLoans } from "../../hooks/requests/useGetAllLoans";
import { useState } from "react";
import { TLoanRequestStatus } from "../../types";
import { usePagination } from "hooks/usePagination";
import { LoanDetails } from "./LoanDetails";
import { DatePicker, Select } from "antd";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import { EmployeeLoanRequestTableActions } from "../../types/request";

const AllLoanRequests = () => {
  const [loanRequestId, setLoanRequestId] = useState<number>();
  const [openLoanDetails, setOpenLoanDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const [storeStatus, setStoreStatus] = useState<TLoanRequestStatus[]>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetAllLoans({
    props: {
      pagination: pagination,
      date: selectedDate ?? "",
      status: storeStatus ?? [],
    },
  });

  const handleLoanDetails = (id: number) => {
    setLoanRequestId(id);
    setOpenLoanDetails(true);
  };

  const actions: EmployeeLoanRequestTableActions = {
    handleLoanDetails,
    // You can add more functions here
  };

  const columns = EMPLOYEE_ALL_LOAN_TABLE_COLUMNS(actions);

  return (
    <div>
      <LoanDetails
        open={openLoanDetails}
        handleClose={() => setOpenLoanDetails(false)}
        id={loanRequestId ?? 0}
        loanDetailSource="all-loans-request"
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

export default AllLoanRequests;
