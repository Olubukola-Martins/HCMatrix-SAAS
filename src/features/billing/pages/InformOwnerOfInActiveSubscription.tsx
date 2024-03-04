import { AppButton } from "components/button/AppButton";
import { ErrorComponent } from "components/errorHandlers/ErrorComponent";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { ExpiredSubscription } from "../components/subscription/ExpiredSubscription";
import { useEffect, useState } from "react";

const InformOwnerOfInActiveSubscription = () => {
  const [showD, setShowD] = useState(false);
  useEffect(() => {
    setShowD(true);
  }, []);
  return (
    <>
      <ExpiredSubscription handleClose={() => setShowD(false)} open={showD} />
      <div className="Container space-y-8 lg:space-y-16">
        <PageIntro title="Inactive Subscription" />
        <ErrorComponent
          message="Inactive Subscription"
          supportText="Please renew your subscription, to continue using our services!"
          showImage
        />
        <div className="w-full flex items-center justify-center">
          <Link to={appRoutes.billingSubscription}>
            <AppButton label="Renew Subcription" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default InformOwnerOfInActiveSubscription;
