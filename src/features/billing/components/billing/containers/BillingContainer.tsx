import React, { useState } from "react";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import CurrentPlanCard from "../cards/CurrentPlanCard";
import ModulesCard from "../cards/ModulesCard";
import SupportPlanCard from "../cards/SupportPlanCard";
import BillingsHistoryTable from "../BillingHistoryTable";
import UpgradePlan from "../modals/UpgradePlan";
import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { Skeleton } from "antd";
import { contructBillingDetailsBasedOnSubsriptionType } from "features/billing/utils";
import moment from "moment";

const BillingContainer = () => {
  const [openUogradeModal, setOpenUpgradeModal] = useState(false);
  const { data: sub, isLoading: isLoadingSub } =
    useGetCompanyActiveSubscription();
  const {
    subName,
    billingPrice,
    currentUsers,
    userLimit,
    billingCurrency,
    billingCycle,
    modules,
    currentReoccuringAmount,
    nextReoccuringDate,
  } = contructBillingDetailsBasedOnSubsriptionType(sub);
  return (
    <ErrorBoundary>
      <UpgradePlan
        open={openUogradeModal}
        handleClose={() => setOpenUpgradeModal(false)}
      />
      <div className="flex flex-col gap-y-7">
        <Skeleton loading={isLoadingSub} active paragraph={{ rows: 12 }}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4">
            <CurrentPlanCard
              handleUpgrade={() => setOpenUpgradeModal(true)}
              billingPrice={billingPrice}
              currentPlanName={subName}
              currentUsers={currentUsers}
              usersLimit={userLimit}
              currency={billingCurrency}
              cycle={billingCycle}
            />
            <ModulesCard modulesData={modules} />
            <SupportPlanCard
              currentRecurringAmount={currentReoccuringAmount}
              date={nextReoccuringDate}
            />
          </div>
        </Skeleton>

        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">Billing History</p>
          <BillingsHistoryTable
            dataHistory={sub?.billingHistory?.map((b) => ({
              amount: b.amountPaid,
              billingCycle: "N/A",
              date: moment(b.billingDate).format(`MMMM DD, YYYY`),
              status: b.status,
              id: b.id,
              key: b.id,
              type: b.name,
              billings: `#${b.paymentReference}`,
            }))}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BillingContainer;
