import { REPAYMENT_SCHEDULE_TABLE_COLUMNS } from "../components/EmployeeLoanPayment/columns/repaymentScheduleColumn";
import { useGetRepaymentPlanDetails } from "../hooks/repayment/useGetRepaymentPlanDetails";
import { useParams } from "react-router-dom";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { PageIntro } from "components/layout/PageIntro";
import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import { SimpleCard } from "components/cards/SimpleCard";
import { TableWithFocusType } from "components/table";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

const LoanRePaymentSchedule = () => {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useGetRepaymentPlanDetails({
    id: id as unknown as number,
  });

  const columns = REPAYMENT_SCHEDULE_TABLE_COLUMNS();

  return (
    <div>
      <SelfServiceSubNav />

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

export default LoanRePaymentSchedule;
