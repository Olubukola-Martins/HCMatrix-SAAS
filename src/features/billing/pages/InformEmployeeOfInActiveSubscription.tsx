import { ErrorComponent } from "components/errorHandlers/ErrorComponent";
import { PageIntro } from "components/layout/PageIntro";

const InformEmployeeOfInActiveSubscription = () => {
  return (
    <div className="Container space-y-8 lg:space-y-16">
      <PageIntro title="Inactive Subscription" />
      <ErrorComponent
        message="Inactive Subscription"
        supportText="Please contact administrator to renew subscription!"
        showImage
      />
    </div>
  );
};

export default InformEmployeeOfInActiveSubscription;
