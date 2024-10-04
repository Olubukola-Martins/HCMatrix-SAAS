import BillingsHistoryTable from "../BillingHistoryTable";
import { usePagination } from "hooks/usePagination";
import { useGetBillingHistory } from "features/billing/hooks/company/billingHistory/useGetBillingHistory";
import moment from "moment";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

const BillingHistoryContainer = () => {
  const { onChange, pagination } = usePagination();
  const { data, isLoading } = useGetBillingHistory({
    props: {
      pagination,
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-lg">Billing History</p>
      <BillingsHistoryTable
        dataHistory={data?.data?.map((b) => ({
          amount: formatNumberWithCommas(b.amountPaid),
          billingCycle: b.companySubscription.billingCycle,
          date: moment(b.billingDate).format(`MMMM DD, YYYY`),
          status: b.status,
          id: b.id,
          key: b.id,
          type: b.companySubscription.type,
          billings: b?.paymentReference ? `#${b.paymentReference}` : "",
        }))}
        loading={isLoading}
        pagination={{ ...pagination, onChange, total: data?.total }}
      />
    </div>
  );
};

export default BillingHistoryContainer;
