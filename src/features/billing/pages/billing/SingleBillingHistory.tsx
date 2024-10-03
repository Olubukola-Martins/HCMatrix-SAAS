import BillingTransactionDetails from "features/billing/components/billing/transactionHistory/BillingTransactionDetails";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import CurrentPlanCard from "features/billing/components/billing/cards/CurrentPlanCard";
import { useGetBillingHistoryById } from "features/billing/hooks/company/billingHistory/useGetBillingHistoryById";
import { useParams } from "react-router-dom";
import { contructBillingDetailsBasedOnSubsriptionType } from "features/billing/utils";

const SingleBillingHistory = () => {
  const params = useParams();
  const id = params.id as string;
  const {
    data: billingTransaction,
    isLoading,
    isError,
    error,
  } = useGetBillingHistoryById({
    id: +id,
  });
  const {
    subName,
    billingPrice,
    currentUsers,
    userLimit,
    billingCurrency,
    billingCycle,
  } = contructBillingDetailsBasedOnSubsriptionType(
    billingTransaction?.companySubscription
  );
  return (
    <ErrorBoundary>
      <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
        <ErrorWrapper
          isError={isError}
          message={
            error?.response?.data?.message ??
            error?.response?.data?.error?.message
          }
        >
          <div className="Container space-y-4 ">
            <PageIntro
              title="Billing Summary"
              link={appRoutes.billingSummary}
            />
            <div className="mb-7">
              <PageSubHeader
                description={`${
                  billingTransaction?.companySubscription.type === "plan"
                    ? `Your plan is ${billingTransaction.companySubscription.plan.name} plan`
                    : `You purchased ${billingTransaction?.companySubscription.modules.length} modules`
                }`}
                hideBackground
              />

              <CurrentPlanCard
                borderedProgressBar={true}
                showUpgradeBtn={false}
                billingPrice={billingPrice}
                extraStyles="w-60 max-w-full"
                currentPlanName={subName}
                currentUsers={currentUsers}
                usersLimit={userLimit}
                currency={billingCurrency}
                cycle={billingCycle}
              />
            </div>

            <BillingTransactionDetails
              billingTransaction={billingTransaction}
            />
          </div>
        </ErrorWrapper>
      </Skeleton>
    </ErrorBoundary>
  );
};

export default SingleBillingHistory;
