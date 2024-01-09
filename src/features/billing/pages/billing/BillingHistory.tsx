import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import BillingContainer from "features/billing/components/billing/BillingContainer";

const BillingHistory = () => {
  const handleDownloadSupportPlan = () => {};
  return (
    <div className="Container space-y-8 lg:space-y-16">
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
