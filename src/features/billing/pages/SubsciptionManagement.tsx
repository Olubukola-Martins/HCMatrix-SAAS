import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import React from "react";
import SubscriptionContainer from "../components/subscription/SubscriptionContainer";

const SubsciptionManagement = () => {
  return (
    <>
      <div className="Container flex flex-col gap-4">
        <PageIntro title="Subscription" link={appRoutes.settings} />
        <SubscriptionContainer />
      </div>
    </>
  );
};

export default SubsciptionManagement;
