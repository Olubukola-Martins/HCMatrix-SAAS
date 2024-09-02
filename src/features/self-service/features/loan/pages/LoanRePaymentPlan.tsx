import { SimpleCard } from "components/cards/SimpleCard";
import { PageIntro } from "components/layout/PageIntro";
import { TableWithFocusType } from "components/table";
import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { REPAYMENT_PLAN_TABLE_COLUMNS } from "../components/repayments/columns/repaymentPlanColumn";
import { useGetRepaymentPlanDetails } from "../hooks/repayment/useGetRepaymentPlanDetails";
import { useParams } from "react-router-dom";
import { ChangeRepaymentStatus } from "../components/repayments/ChangeRepaymentStatus";
import { useState } from "react";
import { EmployeeLoanRequestTableActions } from "../types/request";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

const LoanRePaymentPlan = () => {
  const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
  const [getRepaymentId, setGetRepaymentId] = useState<number>();
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useGetRepaymentPlanDetails({
    id: id as unknown as number,
  });

  const handleGetRepaymentPlan = (id: number) => {
    setGetRepaymentId(id);
    setOpenConfirmPayment(true);
  };

  const handleLoanDetails = () => {};

  const actions: EmployeeLoanRequestTableActions = {
    handleLoanDetails,
    handleGetRepaymentPlan,
    // You can add more functions here
  };

  const columns = REPAYMENT_PLAN_TABLE_COLUMNS(actions);

  return (
    <div>
      <SelfServiceSubNav />
      <ChangeRepaymentStatus
        open={openConfirmPayment}
        handleClose={() => setOpenConfirmPayment(false)}
        scheduleId={getRepaymentId ?? 0}
        loanId={id as unknown as number}
      />
      <div className="relative mb-20">
        <BackgroundCurves />
        <div className="absolute top-4 Container mt-8 w-full">
          <PageIntro link={true} title="Repayment Plan" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-7">
            <SimpleCard
              title="Loan Amount"
              highlight={`${formatNumberWithCommas(data?.loanAmount ?? 0)}`}
              loading={isLoading}
            />
            <SimpleCard
              title="Paid Amount"
              highlight={`${formatNumberWithCommas(data?.paidAmount ?? 0)}`}
              loading={isLoading}
            />
            <SimpleCard
              title="Pending Amount"
              highlight={`${formatNumberWithCommas(data?.pendingAmount ?? 0)}`}
              loading={isLoading}
            />
            <SimpleCard
             title="No. of Repayment left"
              highlight={`${data?.repaymentsLeft ?? 0}`}
              loading={isLoading}
            />
          </div>
         
          <TableWithFocusType
            columns={columns}
            dataSource={data?.result}
            loading={isLoading}
            pagination={{ pageSize: 10, total: data?.totalCount }}
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanRePaymentPlan;
