import { TableWithFocusType } from "components/table";
import { ALL_LOAN_PAYMENT_TABLE_COLUMNS } from "./columns/allLoanPaymentColumn";
import { useGetLoanRepayments } from "../../hooks/repayment/useGetLoanRepayments";
import { usePagination } from "hooks/usePagination";
import { EmployeeLoanRequestTableActions } from "../../types/request";
import { useState } from "react";
import { LoanDetails } from "../AllLoans/LoanDetails";
import { DatePicker } from "antd";

const AllLoanRepayments = () => {
  const [loanRequestId, setLoanRequestId] = useState<number>();
  const [openLoanDetails, setOpenLoanDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetLoanRepayments({
    props: { pagination, date: selectedDate ?? "" },
    type: undefined,
  });

  const handleLoanDetails = (id: number) => {
    setLoanRequestId(id);
    setOpenLoanDetails(true);
  };

  const actions: EmployeeLoanRequestTableActions = {
    handleLoanDetails,
  };

  const columns = ALL_LOAN_PAYMENT_TABLE_COLUMNS(actions);

  return (
    <div>
      <div>
        <DatePicker
          className="w-full"
          style={{ width: "10rem" }}
          onChange={(val) =>
            setSelectedDate(val ? val.format("YYYY-MM-DD") : null)
          }
        />
      </div>
      <LoanDetails
        open={openLoanDetails}
        handleClose={() => setOpenLoanDetails(false)}
        id={loanRequestId ?? 0}
        loanDetailSource="all-loans-request"
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

export default AllLoanRepayments;
