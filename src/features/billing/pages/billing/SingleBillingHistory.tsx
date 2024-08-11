import BillingTransactionDetails from "features/billing/components/billing/transactionHistory/BillingTransactionDetails";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";
import { useGetSubscriptionTransaction } from "features/billing/hooks/company/transaction/useGetSubscriptionTransaction";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import CurrentPlanCard from "features/billing/components/billing/cards/CurrentPlanCard";

const SingleBillingHistory = () => {
  const params = useParams();
  const id = params.id as string;
  const {
    data: billingTransaction,
    isLoading,
    isError,
    error,
  } = useGetSubscriptionTransaction({
    id: +id,
  });
  const navigate = useNavigate();
  return (
    <ErrorBoundary>
      <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
        <ErrorWrapper isError={isError} message={error?.response?.data?.message ?? error?.response?.data?.error?.message}>
          <div className="Container space-y-4 ">
            <PageIntro title="Billing Summary" link={appRoutes.billingSummary} />
            <div className="mb-7">
              <PageSubHeader description={`Your Current Plan is Basic Plan`} hideBackground />
              <CurrentPlanCard billingPrice={2.49} currentPlanName="Basic" currentUsers={500} usersLimit={1000} extraStyles="w-60 max-w-full" borderedProgressBar={true} showUpgradeBtn={false} />
            </div>

            <BillingTransactionDetails billingTransaction={billingTransaction} />
          </div>
        </ErrorWrapper>
      </Skeleton>
    </ErrorBoundary>
  );
};

export default SingleBillingHistory;
