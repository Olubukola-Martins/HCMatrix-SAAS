import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import BillingContainer from "features/billing/components/billing/BillingContainer";
import BillingSupportPlan from "features/billing/components/billing/BillingSupportPlan";
import { useState } from "react";

const BillingHistory = () => {
  const [action, setAction] = useState<"download-support-plan">();
  const handleDownloadSupportPlan = () => {
    setAction("download-support-plan");
  };
  return (
    <div className="Container space-y-8 lg:space-y-16">
      <BillingSupportPlan
        open={action === "download-support-plan"}
        handleClose={() => setAction(undefined)}
      />
      <PageIntro
        title="Billing Summary"
        link={appRoutes.settings}
        actions={[
          {
            name: "Download Support Plan",
            handleClick: handleDownloadSupportPlan,
          },
        ]}
      />

      <BillingContainer />
    </div>
  );
};

export default BillingHistory;
