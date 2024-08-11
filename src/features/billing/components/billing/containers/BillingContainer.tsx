import React, {  useState } from "react";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import CurrentPlanCard from "../cards/CurrentPlanCard";
import ModulesCard from "../cards/ModulesCard";
import SupportPlanCard from "../cards/SupportPlanCard";
import BillingsHistoryTable from "../BillingHistoryTable";
import UpgradePlan from "../modals/UpgradePlan";

const BillingContainer = () => {
  const [openUogradeModal, setOpenUpgradeModal] = useState(false);
  return (
    <ErrorBoundary>
      <UpgradePlan open={openUogradeModal} handleClose={() => setOpenUpgradeModal(false)} />
      <div className="flex flex-col gap-y-7">
        <div className="flex flex-col sm:gap-4 sm:flex-wrap max-sm:gap-y-4 sm:flex-row sm:justify-between mx-auto align-middle items-center justify-items-center">
          <CurrentPlanCard handleUpgrade={() => setOpenUpgradeModal(true)} billingPrice={2.49} currentPlanName="Basic" currentUsers={500} usersLimit={1000} />
          <SupportPlanCard currentRecurringAmount={300} date="mm/dd/yyyy" />
          <ModulesCard />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">Billing History</p>
          <BillingsHistoryTable />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BillingContainer;
